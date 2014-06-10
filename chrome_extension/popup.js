var GO_TO_SITE_LINK = "<a href='http://localhost:3000/sites/'>Go To Site</a>";

SAVED_URL_PAGE =
{
  read_status: 'unread',

  create: function()
  {
    return "<div class='container saved'>" +
             ("<select name='post[person_id]'>" +
               "<option value='Unread'" + (this.read_status == 'unread' ? " selected='selected'" : '') + ">Unread</option>" +
               "<option value='Read'" + (this.read_status == 'read' ? " selected='selected'" : '') + ">Read</option>" +
             "</select>") +
             "<b>" +
             GO_TO_SITE_LINK +
             "<button id='delete' type='button'>Delete Url</button>" +
            "</div>"
  },

  bindEvents: function()
  {
    $('body#Joe_Chrome_Extension_No_Touchie button#delete').click(function()
    {
      console.log("#22")
      deleteLocationViaAjax('delete', "http://localhost:3000/sites/1");
    })

    var url = "http://localhost:3000/sites/"
    $('body#Joe_Chrome_Extension_No_Touchie select').change(function(e){
      e.preventDefault();
      xhr = $.ajax({
        type: "put",
        url: url,
        data: {select_value: $("body#Joe_Chrome_Extension_No_Touchie  :selected").val(), 'location': here},
        crossDomain: true,
        xhrFields: {
          withCredentials: true
        }
      }, 'text')
      .done(function(response_val)
      {
        console.log('select updated to : ' + response_val)
      });
    })
    console.log('binding saved events 1 ')
  }
};

UNSAVED_URL_PAGE =
{
  SAVE_BUTTON:  "<button id='save' type='button'>Save Url</button>",
  LOADING_GIF: "<img id='loading_gif' src='images/ajax-loader.gif'>",

  create: function()
  {
    return "<div class='container unsaved'>" +
             this.SAVE_BUTTON +
             GO_TO_SITE_LINK +
            "</div>"
  },

  bindEvents: function(){
    console.log('binding unsaved events')

    $('body#Joe_Chrome_Extension_No_Touchie button#save').click(function()
    {
      console.log("save button clicked 1")
      saveLocationViaAjax('post', "http://localhost:3000/sites");
    });
  }
};


var saveLocationViaAjax = function(method, url, callback)
{
  if($('body#Joe_Chrome_Extension_No_Touchie .container > button').size() > 0)
    $('body#Joe_Chrome_Extension_No_Touchie .container > button').replaceWith(UNSAVED_URL_PAGE.LOADING_GIF);
  else
    return;

  var here = document.URL
  var url = "http://localhost:3000/sites"; // var url = "http://cors-test-101.herokuapp.com/sites" //

 console.log('save request')
  xhr = $.ajax({
    type: method,
    url: url + "?location=" + here,
    crossDomain: true,
    xhrFields: {
      withCredentials: true
    }
  }, 'json')
    .done(function(response_val)
    {
      console.log(response_val)
      $('.container > img').replaceWith(UNSAVED_URL_PAGE.SAVE_BUTTON)
      UNSAVED_URL_PAGE.bindEvents();
      $('body#Joe_Chrome_Extension_No_Touchie .container button#save').click()
    });
}

var deleteLocationViaAjax = function(callback)
{
  console.log('start deleteLocationViaAjax()')
  if($('body#Joe_Chrome_Extension_No_Touchie button#delete').size() > 0)
    $('body#Joe_Chrome_Extension_No_Touchie button#delete').replaceWith(UNSAVED_URL_PAGE.LOADING_GIF);
  else
  {
    console.log("didn't find delete...returning");
    return;
  }

  var here = document.URL
  var url = "http://localhost:3000/sites/1/delete"; // var url = "http://cors-test-101.herokuapp.com/sites/1/delete" //
  xhr = $.ajax({
    type: "post",
    url: url,
    data: {'location': here},
    crossDomain: true,
    xhrFields: {
      withCredentials: true
    }
  }, 'text')
    .success(function(response_val)
    {
      $("body#Joe_Chrome_Extension_No_Touchie #loading_gif").replaceWith(UNSAVED_URL_PAGE.LOADING_GIF)

      console.log('if this throwback ever works then throw a fucking party')
      if(response_val == 'deleted sucessfully')
      {
        console.log(response_val + " ,,,, +++ Delete Location Via Ajax Callback Function")
        UNSAVED_URL_PAGE.create()
        UNSAVED_URL_PAGE.bindEvents()
      }
      else
        console.log(response_val + " ,,,, --- Delete Location Via Ajax Callback Function")
    })
    .done(function(response_val){
      console.log('delete method, done callback worked')
      $("body#Joe_Chrome_Extension_No_Touchie #loading_gif").replaceWith(UNSAVED_URL_PAGE.LOADING_GIF)
    });
}

var checkIfUrlAlreadySaved = function()
{
  var here = document.URL
  var url = "http://localhost:3000/sites/has_url_saved"; // var url = "http://cors-test-101.herokuapp.com/users" //

  $.ajax({
    type: "get",
    url: url,
    data: { 'location': here },
    crossDomain: true,
    xhrFields: { withCredentials: true }
  })
    .success(function(response_val)
    {
      console.log(response_val)
      switch(response_val)
      {
        case 'unread':
        case 'read':    console.log(response_val);
                        if(response_val == 'read')
                          SAVED_URL_PAGE.read_status = "read";
                        else
                          SAVED_URL_PAGE.read_status = "unread";
                        str = "#Joe_Chrome_Extension_No_Touchie .container"

                        $(str).replaceWith(SAVED_URL_PAGE.create());
                        SAVED_URL_PAGE.bindEvents();
                        break;

        case 'not_saved': UNSAVED_URL_PAGE.bindEvents();  // $('.container[class="saved"]').replaceWith(UNSAVED_URL_PAGE.create())
                          break;
        default: console.log( "Error. Url must be either 'unread', 'read', or 'not_saved'. Dont delete Message")
      }
    });
}

$(function()
{
  checkIfUrlAlreadySaved();
});


// $(':selected').val()

// <select name='post[person_id]' <option value='Unread' selected="selected">Unread</option> <option value='Read'>Read</option> </select>