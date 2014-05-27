var element_1 = "<button type='button'>Save Page</button>"
var element_2 = "<img src='images/ajax-loader.gif'>"

var sendLocationViaAjax = function()
{
  if($('.container > button').size() > 0)
    $('button').replaceWith(element_2);
  else
    return;

  var here = document.URL
  var url = "http://localhost:3000/sites"; // var url = "http://cors-test-101.herokuapp.com/sites" //
  xhr = $.ajax({
    type: "post",
    url: url,
    data: {'location': here},
    crossDomain: true,
    xhrFields: {
      withCredentials: true
    }
  }, 'json')
    .done(function()
    {
      console.log(arguments[0])
      $('.container > img').replaceWith(element_1)
    });
}


var checkIfPageAlreadySaved = function()
{

  var here = document.URL
  var url = "http://localhost:3000/sites/has_url"; // var url = "http://cors-test-101.herokuapp.com/users" //
  $.ajax({
    type: "get",
    url: url,
    data: { 'location': here },
    crossDomain: true,
    xhrFields: { withCredentials: true }
  })
    .done(function()
    {
      console.log(arguments)
      if(arguments[0])
        $('#Joe_Chrome_Extension_No_Touchie #submit button').addClass('saved');
      else
        $('#Joe_Chrome_Extension_No_Touchie #submit button').removeClass('saved');
    })
}


$(function()
{
  // checkIfPageAlreadySaved();

  $('body#Joe_Chrome_Extension_No_Touchie #submit').click(function(e)
  {
    sendLocationViaAjax();
  });

    $('body#Joe_Chrome_Extension_No_Touchie a').click(function(e)
  {
    sendLocationViaAjax();
  });
});