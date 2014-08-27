$(function()
{
  // var HOST = "http://localhost:3000/"
  var HOST = "http://cors-test-101.herokuapp.com/"

	var GO_TO_SITE_LINK = "<a href='" + HOST + "sites/'>Go To Site</a>";

  var currentUrl = function()
  {
  	try
  	{
      console.log('take the plunge')
      chrome.tabs.query({currentWindow: true, active: true}, function(tabs)
      {
        window.CURRENT_URL = tabs[0].url;
        console.log("URL : " + window.CURRENT_URL)
        checkIfUrlAlreadySaved();
      })
  	}
  	catch (err)
  	{
  		if(err.name == 'TypeError')
  	  {
  	    window.CURRENT_URL = document.URL;
        console.log('URL :: ' + window.CURRENT_URL)
        checkIfUrlAlreadySaved()
      }
  	  else
  	  {
  	  	document.log("Didnt see Type Error")
        console.log('URL :!: ' + window.CURRENT_URL)
  	    throw "currentUrl() couldn't find browser page location"
      }
    }
  }

  TAGS_TABLE = {
    create: function(attached_tags, available_tags){

      // if(attached_tags.length != 0)
      var available_tags_table = "";
      var attached_tags_table = "";

      if(available_tags.length > 0)
      {
        for (var tag_index = 0; tag_index < available_tags.length; tag_index++) {
          available_tags_table << "<option value="+ available_tags[tag_index] + (this.read_status == 'unread' ? " selected='selected'" : '') + ">available_tags[tag_index]</option>" +
        };
      }


      return "<div>" +

               ("<select name='tags[person_id]'>" +
                 "<option value='unread'" + (this.read_status == 'unread' ? " selected='selected'" : '') + ">Unread</option>" +
                 "<option value='read'" + (this.read_status == 'read' ? " selected='selected'" : '') + ">Read</option>" +
               "</select>")
              "</div>"
    }



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
        deleteLocationViaAjax();
      })

      $("a:contains('Go To Site')").click(function(e){
          e.preventDefault();
          chrome.tabs.create({'url': HOST}, function(){})
      })

      var url = HOST + "sites/1/update"
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

      $("a:contains('Go To Site')").click(function(e){
          e.preventDefault();
          chrome.tabs.create({'url': HOST}, function(){})
      })

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

    var url = HOST + "sites";

   console.log('save request')
    xhr = $.ajax({
      type: 'post',
      url: url,
      data: {'location': here},
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
    var url = HOST + "sites/1/delete";

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
    var url = HOST + "sites/has_url_saved";

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
                            UNSAVED_URL_PAGE.bindEvents();
                            break;
          default: console.log( "Error. Url must be either 'unread', 'read', or 'not_saved'. Dont delete Message")
        }
      });
  };

	currentUrl();
});


// $(':selected').val()


// chrome.browserAction.onClicked.addListener(function(tab) {
//   // No tabs or host permissions needed!
//   console.log('Turning ' + tab.url + ' red!');
//   chrome.tabs.executeScript({
//     code: 'document.body.style.backgroundColor="red"'
//   });
// });
