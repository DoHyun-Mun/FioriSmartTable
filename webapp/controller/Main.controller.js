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
                if (!this.byId("popup")) {
                    Fragment.load({
                        id: this.getView().getId(),
                        name: "com.sap.demo.smarttabledemo.view.fragment.popup",
                        controller: this,
                    }).then(
                        function (oDialog) {
                            this.getView().addDependent(oDialog);
                            oDialog.open(oDialog);
                        }.bind(this)
                    );
                } else {
                    this.byId("popup").open("popup");
                }
            },

            onClose : function () {
                this.byId("popup").close();
            }
        });
    });
