let printAll = "";
let printPopularCurrency = "";
let countPop = 1;
let countAll = 1;
let date2019 = new Date("2019");
let dataTime = new Array();
let inputRateNameOptions = "";
let inputRateNameOptionsArray = new Array();

// UTC數字加上+
function chkUTC() {
  refreshTime = new Date();
  var offset = (refreshTime.getTimezoneOffset())/60*-1;
  return (offset>-1)? "+"+offset.toString() : offset;
}
// 日期補零
function addZero(num) {
  return ("0"+num).substr(-2);
}
// 取得網頁刷新時間
function pageRefreshTime() {
  let utc8 = new Date();
  let mth  = addZero(utc8.getMonth()+1);
  let date = addZero(utc8.getDate());
  let hrs  = addZero(utc8.getHours());
  let min  = addZero(utc8.getMinutes());
  let sec  = addZero(utc8.getSeconds());
  return utc8.getFullYear()+"-"+ mth +"-"+ date +" "+ hrs +":"+ min +":"+ sec;
}
// 匯率取得日期轉換成本地時間
function utcToLocal(txt) {
  let utc8 = new Date((Date.parse(txt))-((refreshTime.getTimezoneOffset())*60*1000));
  let mth  = addZero(utc8.getMonth()+1);
  let date = addZero(utc8.getDate());
  let hrs  = addZero(utc8.getHours());
  let min  = addZero(utc8.getMinutes());
  let sec  = addZero(utc8.getSeconds());
  return utc8.getFullYear()+"-"+ mth +"-"+ date +" "+ hrs +":"+ min +":"+ sec;
}
// 刪除原本資料多餘的USD文字
function removeUSD(usd) {
  return (usd != "USD")
         ? usd.replace("USD", "")
         : usd
}
// 網頁刷新時間
$('.span').text(pageRefreshTime()+" UTC"+chkUTC());

$.when(
$.getJSON('others/codes.json').done(function(re) {codeNames = re;}),
$.getJSON('php/api.php').done(function(dataReceived) {data = dataReceived;})).
then(function () {
  // 取得 API 物件資料
  let names  = Object.keys(data);
  let ivalues = Object.values(data);
  for (let i=0; i<names.length; i++) {
    // 只拿最新的匯率名單
    if (Date.parse(ivalues[i].UTC) > Date.parse(date2019)) {
      // 將取得最新匯率的時間存到變數
      if (i > 0 && (utcToLocal(ivalues[i].UTC)) != (utcToLocal(ivalues[i-1].UTC))) {
        dataTime.push(utcToLocal(ivalues[i].UTC));
      }
      // 找出常用貨幣
      if (codeNames[removeUSD(names[i])][1] == "comm") {
        printPopularCurrency+= `
                        <tr>
                          <td>${countPop}</td>
                          <td>
                            ${codeNames[removeUSD(names[i])][0]} 
                            ${removeUSD(names[i])}
                          </td>
                          <td class="calcRate" id="${removeUSD(names[i])}"></td>
                          <td>${removeUSD(names[i])}</td>
                        </tr>
                      `;
        countPop++;
        // 產生貨幣選項陣列
        inputRateNameOptionsArray.push(removeUSD(names[i]));
      }
      // 去掉舊資料的全部最新匯率貨幣清單
      printAll+= `
                <tr>
                  <td>${countAll}</td>
                  <td>
                    ${(names[i] != "USD")
                    ? names[i].replace("USD", "")
                    : names[i]
                    }
                  </td>
                  <td>
                    ${(names[i] != "USD")
                    ? codeNames[names[i].replace("USD", "")][0]
                    : codeNames[names[i]][0]
                    }
                  </td>
                  <td>
                    ${(ivalues[i].Exrate<0.01 || names[i].length>6)
                    ? ivalues[i].Exrate
                    : ivalues[i].Exrate.toFixed(2)}
                  </td>
                  <td>${utcToLocal(ivalues[i].UTC)}</td>
                </tr>
              `;
      countAll++;
    }
  }
  $('#tb').html(printAll);
  $('#tb2').html(printPopularCurrency);
  $('#dataTime').html(dataTime[0]);
  $('#dataTime2').html(dataTime[0]);
  $('#dt').DataTable({
    "language": {"url": "others/datatables-chinese-traditional.json"},
    "lengthMenu": [ [ -1, 10, 50], [ "All",10, 50] ]
  });
  $('#dt2').DataTable({
    "language": {"url": "others/datatables-chinese-traditional.json"},
    "lengthMenu": [ [ -1], [ "All"] ]
  });
  // 產生貨幣選項
  inputRateNameOptionsArray.sort();
  inputRateNameOptions+=`<option value="----請選擇貨幣----">----請選擇貨幣----</option>`;
  for (let i=0; i<inputRateNameOptionsArray.length; i++) {
    inputRateNameOptions+=`<option value="${inputRateNameOptionsArray[i]}"> 
                                          ${inputRateNameOptionsArray[i]}
                                          ${codeNames[inputRateNameOptionsArray[i]][0]}
                          </option>`;
  }
  $('#inputRateNameFrom').html(inputRateNameOptions);
  $('#inputRateNameTo').html(inputRateNameOptions);
  // $('#dt3 select option').attr("size", $('#inputRateNameFrom option').length);
  // 即時顯示要兌換的來源貨幣名
  $(document).ready(function() {
    $('#inputRateNameFrom').on("change", function() {
      iName = $('#inputRateNameFrom').val();
      $('#calcName').text(codeNames[iName][0]+`(${iName})`);
    });
  });
  // 取得兌換 來源貨幣匯率
  $('#inputRateNameFrom').on("change", function() {
    rateFrom = ivalues[names.indexOf("USD"+($('#inputRateNameFrom').val()))].Exrate;
    $('#fromUSD').text("對1美元匯率︰"+rateFrom);
  });
  // 取得兌換 目標貨幣匯率
  $('#inputRateNameTo').on("change", function() {
    rateTo = ivalues[names.indexOf("USD"+($('#inputRateNameTo').val()))].Exrate;
    $('#toUSD').text("對1美元匯率︰"+rateTo);
  });
  // 匯率換算 上方 輸入+Enter即時換算on("change",
  $('.inputCalcNum1').on("change", function() {
    inputCalcNum1 = $('.inputCalcNum1').val();
    rateTo = ivalues[names.indexOf("USD"+($('#inputRateNameTo').val()))].Exrate;
    $('#inputValue').text(inputCalcNum1+" ");
    $('#result').text((inputCalcNum1*rateTo/rateFrom).toFixed(2));
    for (let i=0; i<names.length; i++) {
      // 只拿最新的匯率名單
      if (Date.parse(ivalues[i].UTC) > Date.parse(date2019)) {
        // 找出常用貨幣
        if (codeNames[removeUSD(names[i])][1] == "comm") {
          rateToSelf = ivalues[names.indexOf(names[i])].Exrate;
          $(`#${removeUSD(names[i])}`).text((inputCalcNum1*rateToSelf/rateFrom).toFixed(2));
    }}}
  });
  // 匯率換算 上方 輸入+Enter即時換算keypress
  $('.inputCalcNum1').keypress(function() {
    inputCalcNum1 = $('.inputCalcNum1').val();
    $('#inputValue').text(inputCalcNum1+" ");
    $('#result').text((inputCalcNum1*rateTo/rateFrom).toFixed(2));
    for (let i=0; i<names.length; i++) {
      // 只拿最新的匯率名單
      if (Date.parse(ivalues[i].UTC) > Date.parse(date2019)) {
        // 找出常用貨幣
        if (codeNames[removeUSD(names[i])][1] == "comm") {
          rateToSelf = ivalues[names.indexOf(names[i])].Exrate;
          $(`#${removeUSD(names[i])}`).text((inputCalcNum1*rateToSelf/rateFrom).toFixed(2));
    }}}
  });
  // 匯率換算 上方 計算按鈕換算
  $('[value="計算"]').click(function() {
    inputCalcNum1 = $('.inputCalcNum1').val();
    $('#result').text((inputCalcNum1*rateTo/rateFrom).toFixed(2));
    for (let i=0; i<names.length; i++) {
      // 只拿最新的匯率名單
      if (Date.parse(ivalues[i].UTC) > Date.parse(date2019)) {
        // 找出常用貨幣
        if (codeNames[removeUSD(names[i])][1] == "comm") {
          rateToSelf = ivalues[names.indexOf(names[i])].Exrate;
          $(`#${removeUSD(names[i])}`).text((inputCalcNum1*rateToSelf/rateFrom).toFixed(2));
    }}}
  });
  // 匯率換算 下方直接換算 輸入+Enter
  $('*').click(function() {
    if ($('') == 'inputCalcNum') {
    let inputCalcNum = $('.inputCalcNum').val();
    let inputID = attr('id');
    console.log(inputID);
    }
    //$('#result').text((inputCalcNum*rateTo/rateFrom).toFixed(2));
  });
  // 匯率換算 下方直接換算 即時換算keypress

}).fail(function(gg) {
  alert('API串接失敗!');
});

// 後台登入
$('h1>img').click(function() {
});

// 上/下頁 按鈕
$('#pageUp').click(function() {
  var scroll = $(window).scrollTop();
  var scrollto = scroll - 800;
  $("html, body").animate({scrollTop: scrollto}, 700);
});
$('#pageDown').click(function() {
  var scroll = $(window).scrollTop();
  var scrollto = scroll + 800;
  $("html, body").animate({scrollTop: scrollto}, 700);
});

// 回頂端 按鈕
$("#goTop").click(function(){
  $("html, body").animate({scrollTop: 605}, 1000);
});
$(window).scroll(function() {
  ($(this).scrollTop() > 50)
  ? $('#goTop').fadeIn("slow")
  : $('#goTop').stop().fadeOut("slow");
});

// 到底部 按鈕
$("#goBottom").click(function(){
  let h = $("html, body").height();
  $("html, body").animate({scrollTop: h}, 1500);
});
$(window).scroll(function() {
  let h = $('html, body').height();
  ($(this).scrollTop() < h-(50+$(window).height()))
  ? $('#goBottom').fadeIn("slow")
  : $('#goBottom').stop().fadeOut("slow");
});