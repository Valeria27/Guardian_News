(function() {
    "use strict";

    var module = angular.module("newsApp");

    module.component("accordionPanel", {
        bindings: {
            "heading": "@",
            "onSelect": "&"
        },
        require: {
            "parent": "^accordion"
        },
        transclude: true,
        controllerAs: "model",
        controller: function() {
            var model = this;
            model.selected = false;

            model.$onInit = function() {
                model.parent.addPanel(model);
            };

            model.select = function() {
                model.parent.selectPanel(this);
                model.onSelect();
            };

            model.turnOn = function() {
                model.selected = true;
            };

            model.turnOff = function() {
                model.selected = false;
            };
        },
        template: "<div class='panel panel-default'> " +
                        "<div class='panel-heading' ng-click='model.select()'>" +
                            "<h4 class='panel-title'>{{model.heading}}</h4>" +
                        "</div>" +
                        "<div ng-if='model.selected' class='panel-body' ng-transclude>" +
                        "</div>" +
                    "</div>"
    });

    module.component("accordion", {
        transclude: true,
        template: "<div class='panel-group' ng-transclude></div>",
        controller: function() {
            var model = this;
            model.panels = [];

            model.selectPanel = function(panel) {
                for(var i in model.panels) {
                    if(panel === model.panels[i]) {
                        model.panels[i].turnOn();
                    }
                    else {
                        model.panels[i].turnOff();
                    }
                }
            };

            model.addPanel = function(panel) {
                model.panels.push(panel);
            };

        }
    });

} ());
