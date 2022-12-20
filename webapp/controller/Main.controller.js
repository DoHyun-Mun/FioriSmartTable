sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("com.sap.demo.smarttabledemo.controller.Main", {
            onInit: function () {
                this.oRouter = this.getOwnerComponent().getRouter();
            },

            onPress: function(oEvent) {
                var oTable = oEvent.getSource();
                var oContext = oTable.getSelectedItem().getBindingContext();
                this.getOwnerComponent().getRouter().navTo("Detail", {qcode: oContext.getPath().substr(1)}, false);
            },

            btnOnPress: function() {
                alert("This is Custom Action Button!!");
            }
        });
    });
