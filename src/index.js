/*eslint no-undef: "off"*/

export const getModel = (def) => {
   return {
      defaults:{
         animation: {value: 'none', name: 'None'},
         duration: 0,
         delay: 0,
         repeat: {value: 0, name: 'None'},
         traits:[
            ...def.model.prototype.defaults.traits,
            ...[{
                  changeProp: 1,
                   type: "select",
                   label: "Animation",
                   name: 'animation',
                   options:[
                     {value: 'none', name: 'None'},
                     {value: 'bounce',name: 'Bounce'},
                     {value: 'wobble',name: 'Wobble'},
                     {value: 'flash',name: 'Flash'},
                     {value: 'pulse',name: 'Pulse'},
                     {value: 'rubberBand',name: 'Rubber Band'},
                     {value: 'bounceIn',name: 'Bounce In'},
                     {value: 'bounceInDown',name: 'Bounce In Down'},
                     {value: 'bounceInLeft',name: 'Bounce In Left'},
                     {value: 'bounceInRight',name: 'Bounce In Right'},
                     {value: 'rotateIn',name: 'Rotate In'},
                     {value: 'rotateOut',name: 'Rotate Out'},
                     //Other animations...
                   ]
             },
             {
                   changeProp: 1,
                   type: "number",
                   label: "Duration(s)",
                   name: "duration",
             }, {
                   changeProp: 1,
                   type: "number",
                   label: "Delay(s)",
                   name: "delay",
             },
             {
                  changeProp: 1,
                  type: "select",
                  label: "Repeat",
                  name: 'repeat',
                  options:[
                     {value: 0, name: 'None'},
                     {value: 1, name: 'Once'},
                     {value: 2, name: 'Twice'},
                     {value: 3, name: 'Three Times'},
                     {value: 'Infinite', name: 'Infinite'}
                  ]
               },
            ]
          ]
       },
       init() {
            this.on('change:animation', this.onAnimationNameChange)
            this.onAnimationNameChange()

            this.on("change:duration", this.onAnimationDurationChange)
            this.onAnimationDurationChange()

            this.on("change:delay", this.onAnimationDelayChange)
            this.onAnimationDelayChange()

            this.on("change:repeat", this.onAnimationRepeatChange)
            this.onAnimationRepeatChange()
       },
       onAnimationNameChange() {
            this.removeStyle("animation-name");
            this.addStyle({ "animation-name": this.get('animation') });
       },
       onAnimationDurationChange() {
            this.removeStyle("animation-duration");
            this.addStyle({ "animation-duration": `${this.get('duration')}s` });
       },
       onAnimationDelayChange() {
            this.removeStyle("animation-delay");
            this.addStyle({ "animation-delay": `${this.get('delay')}s` });
      }, 
      onAnimationRepeatChange() {
            this.removeStyle("animation-iteration-count");
            this.addStyle({ "animation-iteration-count": this.get('repeat') });
      }
   }
}

const Plugin = (editor) => {

   const def = editor.Components.getType("default")
   const model = getModel(def)
   editor.Components.addType("default", { model })
};

export default Plugin
