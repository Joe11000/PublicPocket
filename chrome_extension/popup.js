//var GO_TO_SITE_LINK = "<a href='http://localhost:3000/sites/'>Go To Site</a>";
var GO_TO_SITE_LINK = "<a href='http://cors-test-101.herokuapp.com/sites/'>Go To Site</a>";


currentUrl = function()
{
	try
	{
    chrome.tabs.query({currentWindow: true, active: true}, function(tabs)
    {
      window.CURRENT_URL = tabs[0].url;
    })
    console.log('URL : '  + window.CURRENT_URL)
	}
	catch (err)
	{
		if(err.name == 'TypeError')
	  {
	    window.CURRENT_URL = document.URL;
      console.log('URL :: ' + window.CURRENT_URL)
    }  
	  else
	  { 
	  	document.log("Didnt see Type Error")
      console.log('URL :!: ' + window.CURRENT_URL)
    }

	  return
	}
	//throw "currentURL() couldn't find browser page location"
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

    //var url = "http://localhost:3000/sites/1/update"
    var url = "http://cors-test-101.herokuapp.com/sites/1/update"

    var here = window.CURRENT_URL // //dejegjfnadffbamjjnnfccbngkpghcbi/popup.html
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
      .always(function(response_val)
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
      saveLocationViaAjax();
    });
  }
};

var saveLocationViaAjax = function()
{
  if($('body#Joe_Chrome_Extension_No_Touchie .container > button').size() > 0)
    $('body#Joe_Chrome_Extension_No_Touchie .container > button').replaceWith(UNSAVED_URL_PAGE.LOADING_GIF);
  else
    return;

  var here = window.CURRENT_URL
  
  var url = "http://cors-test-101.herokuapp.com/sites" //var url = "http://localhost:3000/sites"; 

 console.log('save request')
  xhr = $.ajax({
    type: 'post',
    url: url,
    data: {'location': here}
    crossDomain: true,
    xhrFields: {
      withCredentials: true
    }
  }, 'json')
    .always(function(response_val){
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

  var here = window.CURRENT_URL
  var url = "http://cors-test-101.herokuapp.com/sites/1/delete" // var url = "http://localhost:3000/sites/1/delete"; //
  xhr = $.ajax({
    type: "post",
    url: url,
    data: {'location': here},
    crossDomain: true,
    xhrFields: {
      withCredentials: true
    }
  }, 'text')
    .always(function(response_val){
      checkIfUrlAlreadySaved()
    });
}

var checkIfUrlAlreadySaved = function()
{
  var here = window.CURRENT_URL
  var url = "http://cors-test-101.herokuapp.com/users" // var url = "http://localhost:3000/sites/has_url_saved"; //

  $.ajax({
    type: "get",
    url: url,
    data: { 'location': here },
    crossDomain: true,
    xhrFields: { withCredentials: true }
  })
    .always(function(response_val)
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
	currentURL();
  // determineCurrentUrlTestLocal();
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