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
            },

            onBack: function () {
                this.getOwnerComponent().getRouter().navTo("RouteMain");
            },

            onUpdate: async function () {

                // await setBusy(true);
    
                let url = "/v2/dsodata/DS_01(qcode='"+this.getView().byId("i_qcode").getValue()+"')";
                let detailData = {};
                detailData.cost1 = this.getView().byId("i_cost1").getValue();
                detailData.curr1 = this.getView().byId("i_curr1").getValue();
                detailData.cost2 = this.getView().byId("i_cost2").getValue();
                detailData.curr2 = this.getView().byId("i_curr2").getValue();
                detailData.date1 = this.getView().byId("i_date1").getValue();
                
                await this.patch(url, detailData);
                
                this.getView().getModel().refresh();             
                this.getOwnerComponent().getRouter().navTo('RouteMain');

            },

            patch: function (url, data) {
                return new Promise((resolve) => {
                    $.ajax({
                        url: url,
                        type: "GET",
                        beforeSend: function (xhr) {
                            BusyIndicator.show();
                            xhr.setRequestHeader('X-CSRF-Token', "Fetch");
                        }
                    })
                    .done((result, textStatus, xhr) => {
                        let token = xhr.getResponseHeader("X-CSRF-Token");
                        $.ajax({
                            type: 'PATCH',
                            async: false,
                            data: JSON.stringify(data),
                            url: url,
                            beforeSend: function (xhr) {
                                xhr.setRequestHeader('X-CSRF-Token', token);
                                xhr.setRequestHeader('Content-type', 'application/json');
                            },
                            complete: function() {
                                BusyIndicator.hide();
                            }
                        })
                            .done(function (status) {
                                resolve(status);

                            })
                            .fail(function (xhr) {
                                resolve(xhr);
                                MessageBox.error("Patch Request Failed")
                                console.log(xhr);
                            })
                    })
                    .fail(function (xhr) {
                        MessageBox.error("Token Request Failed");
                        console.log(xhr);
                    }                    
                )
                    
                });
            }
        });
    });
