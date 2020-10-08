<?

header("Content-Type: text/html; charset=utf-8");
$email = htmlspecialchars($_POST["email"]);
$name = htmlspecialchars($_POST["name"]);
$tel = htmlspecialchars($_POST["tel"]);
$value = htmlspecialchars($_POST["value"]);

$check = is_array($_POST['check']) ? $_POST['check'] : array();
$check = implode (', ', $check );

$radio = htmlspecialchars($_POST["radio"]);

$refferer = getenv('HTTP_REFERER');
$date=date("d.m.y"); // число.месяц.год  
$time=date("H:i"); // часы:минуты:секунды 
$myemail = "poliv007@yandex.ru, dss5288@yandex.ru";

$tema = "Заявка с сайта Aqua Vita(SALE)";
$message_to_myemail = "
Форма: $value
Имя: $name
Телефон: $tel
";

mail("$myemail"," $tema"," $message_to_myemail");

print "

<script language='JavaScript'> 
  window.location.href = 'success/index.html'
</script>
";  
exit; 
?>