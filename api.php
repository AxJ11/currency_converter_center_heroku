<?php
  // curl是php來取得別處的資料

  // 初始化CURL
  $curl = curl_init();

  // 告知對方關於我的情報，作為識別請求端的軟體或版本型號或作業系統
  curl_setopt($curl, CURLOPT_USERAGENT, 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.103 Safari/537.36');

  // 對方伺服器的憑證如果有SSL且強迫配合，那就要設定為true
  curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);

  // 指定對方位置
  curl_setopt($curl, CURLOPT_URL, 'https://tw.rter.info/capi.php');

  // 資料回來後是否要顯現
  // false時，curl_exec()這個function會自動顯示資料
  // true時，curl_exec()不會自動顯示資料，需要自行做額外處理
  curl_setopt($curl, CURLOPT_RETURNTRANSFER, false);

  // 執行curl
  $dataReceived = curl_exec($curl);

  // 中斷結束curl;  要結束，不然會一直執行
  curl_close($curl);

  // $php_ary = json_decode($result);
  // print_r($result);
?>