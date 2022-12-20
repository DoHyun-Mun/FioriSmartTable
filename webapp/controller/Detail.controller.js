sap.ui.define([
    "sap/ui/core/mvc/Controller"
    
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("com.sap.demo.smarttabledemo.controller.Detail", {
            onInit: function () {
                this.getOwnerComponent().getRouter().getRoute("Detail").attachPatternMatched(this._onObjectMatched, this);
            },

            _onObjectMatched: function(oEvent) {
                this.pQcode = "/" + oEvent.getParameter("arguments").qcode;
                this.getView().bindElement({path: this.pQcode});
            }

        });
    });
