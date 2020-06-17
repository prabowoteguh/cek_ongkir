$(function() {
    ajax_cities()
    ajax_kota()
});

function ajax_cities () {
    $.ajax({
        url: "https://belserion.000webhostapp.com/local_api.php",
        type: "GET",
        dataType: "JSON",
        crossDomain: true,
        success: function (r) {
            var html = ''

            if(r.status){
                var result = r.data
                result.forEach( function(value, index) {
                    html += '<tr>'+
                                '<td scope="row">'+ (index+1) +'</td>' +
                                '<td>'+ value.city_id +'</td>' +
                                '<td>'+ value.city_name +'</td>' +
                                '<td>'+ value.type +'</td>' +
                                '<td>'+ value.province +'</td>' +
                                '<td>'+ value.postal_code +'</td>' +
                            '</tr>'
                });

                fill_table(html, '#tb_cities');
            }else{
                alert(r.pesan);
            }
        }
    });
}

function ajax_kota () {
    $.ajax({
        url: "https://api.banghasan.com/sholat/format/json/kota",
        type: "GET",
        dataType: "JSON",
        crossDomain: true,
        success: function (r) {

            var html = ''

            if(r.status){
                var result = r.kota
                result.forEach( function(value, index) {
                    html += '<tr>'+
                                '<td scope="row">'+ (index+1) +'</td>' +
                                '<td>'+ value.id +'</td>' +
                                '<td>'+ value.nama +'</td>' +
                            '</tr>'
                });

                // $('#tb_kota').find('tbody').empty();

                fill_table(html, '#tb_kota');
            }else{
                alert(r.pesan);
            }
        }
    });
}

function fill_table(html_string, selector){
    $(selector).find('tbody').html(html_string);
    $(selector).dataTable({
        processing: true,
        searching: true,
    });
}

function formatMoney(number, decPlaces, decSep, thouSep) {
    decPlaces   = isNaN(decPlaces = Math.abs(decPlaces)) ? 2 : decPlaces,
    decSep      = typeof decSep === "undefined" ? "." : decSep;
    thouSep     = typeof thouSep === "undefined" ? "," : thouSep;
    var sign    = number < 0 ? "-" : "";
    var i = String(parseInt(number = Math.abs(Number(number) || 0).toFixed(decPlaces)));
    var j = (j = i.length) > 3 ? j % 3 : 0;

    return sign +
        (j ? i.substr(0, j) + thouSep : "") +
        i.substr(j).replace(/(\decSep{3})(?=\decSep)/g, "$1" + thouSep) +
        (decPlaces ? decSep + Math.abs(number - i).toFixed(decPlaces).slice(2) : "");
}

function GetFormattedDate(date) {
    var todayTime   = new Date(date);
    var monthEng    = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    var month       = (todayTime.getMonth());
    var day         = (todayTime.getDate());
    var year        = (todayTime.getFullYear());
    return day + " " + monthEng[month] + " " + year;
}
