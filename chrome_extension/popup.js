var GO_TO_SITE_LINK = "<a href='http://localhost:3000/sites/'>Go To Site</a>";

SAVED_URL_PAGE =
{
  read_status: 'unread',

  create = function(has_url_been_read)
  {
    return "<div class='container saved'>" +
             ("<select name='post[person_id]'>" +
               "<option value='Unread'" + (has_url_been_read == 'unread' ? " selected='selected'" : '') + ">Unread</option>" +
               "<option value='Read'" + (has_url_been_read == 'read' ? " selected='selected'" : '') + ">Read</option>" +
             "</select>") +
             "<b>" +
             GO_TO_SITE_LINK +
             "<button id='delete' type='button'>Delete Url</button>"
            "</div>"
  },

  bindEvents = function(){
    // unnecessary if delegate works
  }
}

UNSAVED_URL_PAGE =
{
  SAVE_BUTTON:  "<button id='save' type='button'>Save Url</button>",
  LOADING_GIF: "<img src='images/ajax-loader.gif'>",

  create = function()
  {
    return "<div class='container unsaved'>" +
             SAVE_BUTTON
             GO_TO_SITE_LINK +
            "</div>"
  },

    bindEvents = function(){
    // unnecessary if delegate works
  }
}


var saveLocationViaAjax = function(method, url)
{
  if($('body#Joe_Chrome_Extension_No_Touchie .container > button').size() > 0)
    $('body#Joe_Chrome_Extension_No_Touchie .container > button').replaceWith(LOADING_GIF);
  else
    return;

  var here = document.URL
  // var url = "http://localhost:3000/sites"; // var url = "http://cors-test-101.herokuapp.com/sites" //

  xhr = $.ajax({
    type: method,
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
      $('.container > img').replaceWith(SAVE_BUTTON)
      $(SAVE_BUTTON).click()
    });
}

var deleteLocationViaAjax = function()
{
  if($('.container > button').size() > 0)
    $('button').replaceWith(LOADING_GIF);
  else
    return;

  var here = document.URL
  var url = "http://localhost:3000/sites/yup"; // var url = "http://cors-test-101.herokuapp.com/sites" //
  xhr = $.ajax({
    type: "delete",
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
      $('.container > img').replaceWith(SAVE_BUTTON)
      $(SAVE_BUTTON).click()
    });

}

var checkIfUrlAlreadySaved = function()
{
  var here = document.URL
<<<<<<< HEAD
  var url = "http://localhost:3000/sites/has_url_saved"; // var url = "http://cors-test-101.herokuapp.com/users" //
=======
  var url = "http://cors-test-101.herokuapp.com/users" // var url = "http://localhost:3000/sites/has_url"; //
>>>>>>> df21e79e222b5cae0721ce9f34a76be031f1f0bf
  $.ajax({
    type: "get",
    url: url,
    data: { 'location': here },
    crossDomain: true,
    xhrFields: { withCredentials: true }
  })
    .done(function()
    {
      console.log(arguments[0])
      if(arguments[0] === true) // current url is stored in db
        $('.container').replaceWith(urlSavedForm(false))

        // $('#Joe_Chrome_Extension_No_Touchie button#save').addClass('saved').text('Save url?');
      else if(arguments[0] === false)            //  current url is not stored in db
        ""
      else
        console.log("Initial existance url check in db returned neither 'saved' nor 'not saved' ")
    })
}

$(function()
{
  checkIfUrlAlreadySaved();

  $('body#Joe_Chrome_Extension_No_Touchie').delegate('button#save', function()
  {
    $(this).click(function(){
      console.log("#1")
      saveLocationViaAjax('post', "http://localhost:3000/sites");
    })
  });

  $('body#Joe_Chrome_Extension_No_Touchie').delegate('button#delete', function()
  {
    $(this).click(function(){
      console.log("#2")
      saveLocationViaAjax('post', "http://localhost:3000/sites");
    })
  });
});

// var STATUS_CHECK_BOX = "<input type='checkbox' value='checked'>Read</input>"


// not saved

// saved unread/read check box
// delete
