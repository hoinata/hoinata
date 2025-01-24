function getCustomerService() {
    var that = this;
    var paramDic = {

    };

    var req_url = "";
    req_url = location.origin;

    var url = req_url + "/csafety/service/sbms/getCodeTableByParentCode.action?content=ssoparameter&code=qidianqq";

    $.ajax({
        url: url,
        type: "GET",
        data: paramDic,
        timeout: 20000,
        xhrFields: { withCredentials: true },
        dataType: 'json',
        success: function (responseData) {

            if (responseData.ret) {
                if (responseData.list) {
                    if (responseData.list.length) {
                        var customer_service = responseData.list[0];
                        var script = document.createElement("script");
                        script.src = customer_service.c5;
                        script.id = customer_service.c4;

                        // script.c3 = customer_service.c3;
                        // script.c4 = customer_service.c4;
                        // script.c5 = customer_service.c5;
                        addDom();
                        $("#customer-service-box").append(script);
                    }
                }
            }
        },
        error: function (result) {
            console.log(result);
        }
    });
}

function addDom() {
    var customer_service_box = document.createElement("div");
    customer_service_box.id = "customer-service-box";
    $('body').append(customer_service_box);
}

getCustomerService();
