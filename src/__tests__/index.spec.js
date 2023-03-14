import Plugin, { getModel } from "../index"

describe("Animations plugin", () => {

    let model;
    beforeEach(() => {
        model = getModel({
          model: {
              prototype: {
                  defaults: {
                      traits: []
                  }
              }
            }
        })
        model.on = jest.fn()
        model.removeStyle = jest.fn()
        model.addStyle = jest.fn()
    })

    describe("Adds animation list to default div item", () => {
        let editor, on, onAnimationChange
        beforeEach(() => {
            on = jest.fn()
            onAnimationChange = jest.fn()
            editor = {
                BlockManager: {
                  add: jest.fn()
                },
                DomComponents: {
                  addType: jest.fn()
                },
                Components: {
                  getType: jest.fn().mockReturnValue({
                    model: {
                      prototype: {
                        defaults: {
                          traits: [],
                        }
                      }
                    },
                  }),
                  addType: jest.fn()
                }
            }
        })

        it("Set ups animation", async () => {
            const expected = {
              "model": {
                "defaults": {
                  animation: {value: 'none', name: 'None'},
                  duration: 0,
                  delay: 0,
                  repeat: {value: 0, name: 'None'},
                  "traits": [
                    {
                      "changeProp": 1, 
                      "label": "Animation", 
                      "name": "animation", 
                      "options": [
                        {value: 'none', name: 'None'},
                        {"name": "Bounce", "value": "bounce"}, 
                        {"name": "Wobble", "value": "wobble"}, 
                        {"name": "Flash", "value": "flash"}, 
                        {"name": "Pulse", "value": "pulse"}, 
                        {"name": "Rubber Band", "value": "rubberBand"}, 
                        {"name": "Bounce In", "value": "bounceIn"}, 
                        {"name": "Bounce In Down", "value": "bounceInDown"}, 
                        {"name": "Bounce In Left", "value": "bounceInLeft"}, 
                        {"name": "Bounce In Right", "value": "bounceInRight"},
                        {value: 'rotateIn',name: 'Rotate In'},
                        {value: 'rotateOut',name: 'Rotate Out'},
                      ], 
                    "type": "select"
                  }, {
                    "changeProp": 1, 
                    "label": "Duration(s)", 
                    "name": "duration", 
                    "type": "number"
                  }, {
                    "changeProp": 1, 
                    "label": "Delay(s)", 
                    "name": "delay", 
                    "type": "number"
                  },{
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
                  }]},
                  "init": expect.any(Function),
                  "onAnimationNameChange": expect.any(Function),
                  "onAnimationDurationChange": expect.any(Function),
                  "onAnimationDelayChange": expect.any(Function),
                  "onAnimationRepeatChange": expect.any(Function)
              }
            }
            Plugin(editor)
            expect(editor.Components.getType).toHaveBeenCalledWith("default")
            expect(editor.Components.addType).toHaveBeenCalledWith("default", expected)
        })
    })

    describe("Animation Name change", () => {

        it("Is added on plugin init", () => {
            model.removeStyle = jest.fn()
            model.addStyle = jest.fn()
            model.get = jest.fn().mockReturnValue('bounce')
            model.onAnimationNameChange = jest.fn()
            model.init()
            expect(model.on).toHaveBeenCalledWith('change:animation', expect.anything())
            expect(model.onAnimationNameChange).toHaveBeenCalled()
        })

        it("Changes animation name property in css", () => {
            model.removeStyle = jest.fn()
            model.addStyle = jest.fn()
            model.get = jest.fn().mockReturnValue('bounce')
            model.onAnimationNameChange()
            expect(model.removeStyle).toHaveBeenCalledWith('animation-name')
            expect(model.addStyle).toHaveBeenCalledWith({ 'animation-name': 'bounce' })
        })
    })

    describe("Animation Duration change", () => {

        it("Is added on plugin init", () => {
            model.removeStyle = jest.fn()
            model.addStyle = jest.fn()
            model.get = jest.fn().mockReturnValue('2')
            model.onAnimationDurationChange = jest.fn()
            model.init()
            expect(model.on).toHaveBeenCalledWith('change:duration', expect.anything())
            expect(model.onAnimationDurationChange).toHaveBeenCalled()
        })

        it("Changes animation duration property in css", () => {
            model.removeStyle = jest.fn()
            model.addStyle = jest.fn()
            model.get = jest.fn().mockReturnValue('2')
            model.onAnimationDurationChange()
            expect(model.removeStyle).toHaveBeenCalledWith('animation-duration')
            expect(model.addStyle).toHaveBeenCalledWith({ 'animation-duration': '2s' })
        })
    })

    describe("Animation Delay change", () => {

      it("Is added on plugin init", () => {
          model.removeStyle = jest.fn()
          model.addStyle = jest.fn()
          model.get = jest.fn().mockReturnValue('2')
          model.onAnimationDelayChange = jest.fn()
          model.init()
          expect(model.on).toHaveBeenCalledWith('change:delay', expect.anything())
          expect(model.onAnimationDelayChange).toHaveBeenCalled()
      })

      it("Changes animation delay property in css", () => {
          model.removeStyle = jest.fn()
          model.addStyle = jest.fn()
          model.get = jest.fn().mockReturnValue('2')
          model.onAnimationDelayChange()
          expect(model.removeStyle).toHaveBeenCalledWith('animation-delay')
          expect(model.addStyle).toHaveBeenCalledWith({ 'animation-delay': '2s' })
      })
    })

    describe("Animation Repeat change", () => {

      it("Is added on plugin init", () => {
          model.removeStyle = jest.fn()
          model.addStyle = jest.fn()
          model.get = jest.fn().mockReturnValue('2')
          model.onAnimationRepeatChange = jest.fn()
          model.init()
          expect(model.on).toHaveBeenCalledWith('change:repeat', expect.anything())
          expect(model.onAnimationRepeatChange).toHaveBeenCalled()
      })

      it("Changes animation delay property in css", () => {
          model.removeStyle = jest.fn()
          model.addStyle = jest.fn()
          model.get = jest.fn().mockReturnValue('2')
          model.onAnimationRepeatChange()
          expect(model.removeStyle).toHaveBeenCalledWith('animation-iteration-count')
          expect(model.addStyle).toHaveBeenCalledWith({ 'animation-iteration-count': '2' })
      })
    })
})
