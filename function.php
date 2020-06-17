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
        "key: 8b07b1e338dd479ac9cb7cd6b319c90e"
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
?>