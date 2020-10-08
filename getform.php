<?php

$ar_tele = array(' ', '(', ')', '+', '-', '_');

$post_data['phone'] = str_replace($ar_tele, '', $_POST['phone']);
$post_data['phone2'] = str_replace($ar_tele, '', $_POST['phone2']);
$post_data['name'] = $_POST['name'];
$post_data['number'] = $_POST['number'];

$my_data = [
'phone' => $_POST['phone'],
'name' => $_POST['name'],
'ip' => $_SERVER["HTTP_CF_CONNECTING_IP"]? $_SERVER["HTTP_CF_CONNECTING_IP"] :
$_SERVER["REMOTE_ADDR"],
'host' => $_SERVER['HTTP_HOST']
];
$my_reqest = file_get_contents('http://ufolona.site/api/add_lead?'.http_build_query($my_data)); 
$my_reqest = json_decode($my_reqest);
$my_id = $my_reqest->id;

if (isset($post_data['phone']) and ($post_data['phone'] !== '') ) {

	$post  = [
		'channel' => '9Qe44v',
		'phone' => $post_data['phone'],
		'name' => $post_data['name'],
		'ip' => $_SERVER["HTTP_CF_CONNECTING_IP"],
        'referer' => 'https://m.facebook.com/',
        'data1' => $_SERVER['HTTP_HOST'],
        'data2' => $my_id,
        'data3' => $post_data['phone'],
	];

    $headers = array("Authorization: Bearer M5f4jQJ-Ssy5g0xRq4GEttqoJSx8xBwh"); // API ТОКЕН
       
	$api_reqest = curl('https://api.kma.biz/lead/add', $post, $headers);

	$upd = ['id' => $my_id, 'response_api' => $api_reqest]; 
	file_get_contents('http://ufolona.site/api/update_lead?'.http_build_query($upd));

	$api_reqest = json_decode($api_reqest);

	if(@$api_reqest->message == 'OK'){
		require_once('_thankyou/ok.php');
	}else{
		//echo 'Ошибка 1!';
	}
} else {
	//echo 'Ошибка 2!';
}

function curl($url, $post = null, $head=0){
	$ch = curl_init($url);
	curl_setopt($ch,CURLOPT_RETURNTRANSFER, 1);
	curl_setopt($ch, CURLOPT_TIMEOUT, 60);
	curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
	curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);

	if($head){
		curl_setopt($ch,CURLOPT_HTTPHEADER, $head);
	}else{
		curl_setopt($ch,CURLOPT_HEADER, 0);
	}

	if($post){
		curl_setopt($ch, CURLOPT_POST, 1);
		curl_setopt($ch, CURLOPT_POSTFIELDS, $post);
	}

	$response = curl_exec($ch);
	$header_data = curl_getinfo($ch);
	curl_close($ch);
	return $response;

}
