<?php
function api_kota(){
    $hasil['status']        = false;
    $hasil['pesan']         = 'Tidak ada request';
    $hasil['data']       	  = array();


    $curl = curl_init();

    curl_setopt_array($curl, array(
      CURLOPT_URL => "https://api.rajaongkir.com/starter/city",
      CURLOPT_RETURNTRANSFER => true,
      CURLOPT_ENCODING => "",
      CURLOPT_MAXREDIRS => 10,
      CURLOPT_TIMEOUT => 30,
      CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
      CURLOPT_CUSTOMREQUEST => "GET",
      CURLOPT_HTTPHEADER => array(
        "key: ce496165f4a20bc07d96b6fe3ab41ded"
      ),
    ));

    $response               = curl_exec($curl);
    $err                    = curl_error($curl);

    curl_close($curl);

    if ($err) {
      $hasil['pesan']       = $err;
    } else {
        $decrypt            = json_decode($response);
        $data               = $decrypt->rajaongkir;
        if($data->status->code == '200'){
            $hasil['status']    = true;
            $hasil['pesan']     = $data->status->description;
            $hasil['data']      = $data->results;
        }else{
            $hasil['pesan'] = $data->status->description;
        }
    }
    return $hasil;
}

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

//======[ CREATE SINGLE API ]======

echo json_encode(api_kota());


?>