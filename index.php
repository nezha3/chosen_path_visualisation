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

    <script type="text/javascript" src="js/d3.v3.min.js"></script><!-- D3 JS -->
    <link rel="stylesheet" type="text/css"
      href="https://fonts.googleapis.com/css?family=Open+Sans:400,600"><!-- google font -->
    <link rel="stylesheet" type="text/css" href="css/bootstrap.css">

    </head>

  <body>

    <script type="text/javascript" src="js/jquery.js"></script>
    <script type="text/javascript" src="js/bootstrap.js"></script>
    <script type="text/javascript" src="js/chart.js"></script>
  </body>
</html>

<?
}
?>
