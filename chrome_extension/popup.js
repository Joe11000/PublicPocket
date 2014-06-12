var GO_TO_SITE_LINK = "<a href='http://localhost:3000/sites/'>Go To Site</a>";

var current_url;

send_ajax = function(method='post', url='', data={}, return_type='text', callbackFunction={}){
  if(method.match(/post/i))
  {
    xhr = $.ajax({
      type: method,
      url: url,
      data: {'location': current_url},
      crossDomain: true,
      xhrFields: {
        withCredentials: true
      }, return_type)
      .done(function(response_val){
        callbackFunction()
      })
    })
  }
  else if (method.match(/get/i))
  {
    var data_encoded_url = "?" + $.param(data);

    xhr = $.ajax({
      type: method,
      url: data_encoded_url,
      crossDomain: true,
      xhrFields: {
      withCredentials: true
    }, return_type)
    .done(function(response_val){
      callbackFunction()
    });
  })
  else
  {}
}

determineCurrentUrl = function()
{
  chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
    current_url = tabs[0].url;
  });
}

SAVED_URL_PAGE =
{
  read_status: 'unread',

  create: function()
  {
    return "<div class='container saved'>" +
             ("<select name='post[person_id]'>" +
               "<option value='unread'" + (this.read_status == 'unread' ? " selected='selected'" : '') + ">Unread</option>" +
               "<option value='read'" + (this.read_status == 'read' ? " selected='selected'" : '') + ">Read</option>" +
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
      deleteLocationViaAjax(); //'delete', "http://localhost:3000/sites/1");
    })

    var url = "http://localhost:3000/sites/1/update"
    var here = current_url// document.URL // //dejegjfnadffbamjjnnfccbngkpghcbi/popup.html
    $('body#Joe_Chrome_Extension_No_Touchie select').change(function(e){
      e.preventDefault();
      xhr = $.ajax({
        type: "post",
        url: url,
        data: {select_value: $("body#Joe_Chrome_Extension_No_Touchie  :selected").val(), 'location': here },
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

  var here = current_url// document.URL
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
      // console.log(response_val)
      // $('.container > img').replaceWith(UNSAVED_URL_PAGE.SAVE_BUTTON)
      // UNSAVED_URL_PAGE.bindEvents();
      // $('body#Joe_Chrome_Extension_No_Touchie .container button#save').click()
      checkIfUrlAlreadySaved()
    })
    .fail(function(response_val){
      checkIfUrlAlreadySaved()
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

  var here = current_url// document.URL
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
    // .success(function(response_val)
    // {
    //   $("body#Joe_Chrome_Extension_No_Touchie #loading_gif").replaceWith(UNSAVED_URL_PAGE.LOADING_GIF)

    //   console.log('if this throwback ever works then throw a fucking party')
    //   if(response_val == 'sucessful delete')
    //   {
    //     console.log(response_val + " ,,,, +++ Delete Location Via Ajax Callback Function")
    //     UNSAVED_URL_PAGE.create()
    //     UNSAVED_URL_PAGE.bindEvents()
    //   }
    //   else
    //     console.log(response_val + " ,,,, --- Delete Location Via Ajax Callback Function")
    // })
    // .done(function(response_val){
    //   console.log('delete method, done callback worked')
    //   $("body#Joe_Chrome_Extension_No_Touchie #loading_gif").replaceWith(UNSAVED_URL_PAGE.LOADING_GIF)
    // })
    .fail(function(response_val){
      checkIfUrlAlreadySaved()
    })
}

var checkIfUrlAlreadySaved = function()
{
  var here = current_url// document.URL
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

        case 'not_saved': str = "#Joe_Chrome_Extension_No_Touchie .container"
                          $(str).replaceWith(UNSAVED_URL_PAGE.create());
                          UNSAVED_URL_PAGE.bindEvents();  // $('.container[class="saved"]').replaceWith(UNSAVED_URL_PAGE.create())
                          break;
        default: console.log( "Error. Url must be either 'unread', 'read', or 'not_saved'. Dont delete Message")
      }
    });
}

$(function()
{
  determineCurrentUrl();

  checkIfUrlAlreadySaved();
});


// $(':selected').val()


// chrome.browserAction.onClicked.addListener(function(tab) {
//   // No tabs or host permissions needed!
//   console.log('Turning ' + tab.url + ' red!');
//   chrome.tabs.executeScript({
//     code: 'document.body.style.backgroundColor="red"'
//   });
// });