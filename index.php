<?
//php file header
if ($_SERVER['REQUEST_METHOD'] === 'POST')
{
  $file = '/tmp/sample-app.log';
  $message = file_get_contents('php://input');
  file_put_contents($file, date('Y-m-d H:i:s') . " Received message: " . $message . "\n", FILE_APPEND);
}
else
{
?>

<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">

    <title>Chosen Path Visualisation</title>
    <link rel="stylesheet" type="text/css"
      href="https://fonts.googleapis.com/css?family=Open+Sans:400,600"><!-- google font -->
    <link rel="stylesheet" type="text/css" href="css/bootstrap.css">
    <link rel="stylesheet" type="text/css" href="css/slider.css">
    <link rel="stylesheet" type="text/css" href="css/sunburst.css">

    <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/js/bootstrap.min.js"></script>
	  <script src="https://d3js.org/d3.v4.min.js"></script>

    </head>

  <body>
    <!-- Sliders -->
      <!--
      <div id="slider1"></div>
      <div id="slider2"></div>
      <div id="slider3"></div>
      <div id="slider4"></div>
      <div id="slider5"></div>
      <div id="slider6"></div>
      -->
    <!-- Store Results From Sliders -->
      <!--
      <s id="s1-min"></s><s id="s1-max"></s>
      <s id="s2-min"></s><s id="s2-max"></s>
      <s id="s3-min"></s><s id="s3-max"></s>
      <s id="s4-min"></s><s id="s4-max"></s>
      <s id="s5-min"></s><s id="s5-max"></s>
      <s id="s6-min"></s><s id="s6-max"></s>
      -->
      <div id="chart"></div>
      <div class="">

      </div>
      <div class="">

      </div>
  </body>
  <script type="text/javascript" src="js/chart.js"></script>
  <script type="text/javascript" src="js/slider.js"></script>
  <script type="text/javascript" src="js/sunburst.js"></script>
  </html>

<?
}
?>
