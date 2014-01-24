<!DOCTYPE html>
<html class="no-js">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
        <title></title>
        <meta name="description" content="">
        <meta name="viewport" content="width=device-width">
        <link rel="stylesheet" href="css/main.css">
        <script src="//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
        <script src="js/keccak.js"></script>
        <script src="js/base91.js"></script>
        <script src="js/binary.js"></script>
        <style>
        body {
font-size: 160%;
}
input {
clear: both;
display: block;
font-size: 30px;
margin: 8px 0px;
padding: 3px;
width: 400px;
}
#result {
border: 2px solid black;
padding: 3px;
width: 400px;
margin: 6px 0px;
}
        </style>
    </head>
    <body>
        <input placeholder="website, e.g. facebook.com" id="website">
        <input placeholder="master password" id="masterpw">
        <p id="result">?</p>
<pre>
algorithm:
hash = base91( sha3( website + ':' + password ) )
pw   = hash.sub( 0, 16 );
</pre>
<script>

$.event.special.inputchange = {
    setup: function() {
        var self = this, val;
        $.data(this, 'timer', window.setInterval(function() {
            val = self.value;
            if ( $.data( self, 'cache') != val ) {
                $.data( self, 'cache', val );
                $( self ).trigger( 'inputchange' );
            }
        }, 20));
    },
    teardown: function() {
        window.clearInterval( $.data(this, 'timer') );
    },
    add: function() {
        $.data(this, 'cache', this.value);
    }
};

$('#masterpw').on('inputchange', function() {
    update();
});
$('#website').on('inputchange', function() {
    update();
});

function update() {
    $('#result').text("...");


    var str = $('#website').val() + ":" +  $('#masterpw').val()
    var sha = keccak(str);
    var num = hex2array(sha); 
    var bin = array2binary(num); 
    var b91 = base91.encode(bin);
    var pw  = b91.substr(0,16);


    $('#result').text(pw);
}

        </script>
    </body>
</html>

