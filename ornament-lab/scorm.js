(function(){
  'use strict';

  let api=null;
  let initialized=false;

  function findAPI(win){
    let current=win;
    let attempts=0;
    while(current&&attempts<12){
      try{if(current.API)return current.API}catch(error){break}
      if(current.parent===current)break;
      current=current.parent;
      attempts++;
    }
    try{if(win.opener)return findAPI(win.opener)}catch(error){return null}
    return null;
  }

  function call(method,...args){
    if(!api||typeof api[method]!=='function')return null;
    try{return api[method](...args)}catch(error){return null}
  }

  const SCORM={
    init(){
      api=findAPI(window);
      if(!api)return false;
      const result=call('LMSInitialize','');
      initialized=result==='true'||result===true;
      if(initialized){
        const status=this.get('cmi.core.lesson_status');
        if(!status||status==='not attempted')this.set('cmi.core.lesson_status','incomplete');
        this.set('cmi.core.score.min','0');
        this.set('cmi.core.score.max','10');
        this.commit();
      }
      return initialized;
    },
    isConnected(){return initialized},
    get(key){return initialized?(call('LMSGetValue',key)||''):''},
    set(key,value){if(!initialized)return false;const result=call('LMSSetValue',key,String(value));return result==='true'||result===true},
    commit(){if(!initialized)return false;const result=call('LMSCommit','');return result==='true'||result===true},
    saveState(state,score){
      if(!initialized)return false;
      this.set('cmi.suspend_data',JSON.stringify(state).slice(0,3900));
      this.set('cmi.core.lesson_location',state.currentView||'intro');
      this.set('cmi.core.score.raw',score);
      this.set('cmi.core.exit','suspend');
      return this.commit();
    },
    loadState(){
      if(!initialized)return null;
      const raw=this.get('cmi.suspend_data');
      if(!raw)return null;
      try{return JSON.parse(raw)}catch(error){return null}
    },
    complete(score){
      if(!initialized)return false;
      this.set('cmi.core.score.raw',score);
      this.set('cmi.core.lesson_status',score>=6?'passed':'failed');
      this.set('cmi.core.exit','');
      return this.commit();
    },
    finish(){
      if(!initialized)return false;
      const result=call('LMSFinish','');
      initialized=false;
      return result==='true'||result===true;
    }
  };

  window.SCORM=SCORM;
})();
