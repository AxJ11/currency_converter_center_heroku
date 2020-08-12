

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Document</title>
  <link rel="stylesheet" type="text/css" href="css/index_style.css">
  <script src="js/jquery-3.4.1.min.js"></script>
  </script>
  <style>
    
  </style>
</head>
<body>
  <div class="login">
    <form action="" onsubmit="return check(this)">
      圖片上傳<input type="file" name="acc"><br /><br />
      <input type="submit" value="確定">
    </form>
  </div>

  <script>
    function check(who) {
      let aa = $(who).children('input[name:ans]').val();
      if (aa != <?= $ans ?>) {
        alert('驗證碼錯誤!!!'); 
        return false;
      }
      else return true;  // 可省略
    }
  </script>
</body>
</html>