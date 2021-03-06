$(function()
{
  var HOST = "http://localhost:3000/"
  // var HOST = "http://cors-test-101.herokuapp.com/"

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
  	    throw "currentUrl() couldn't find browser page url"
      }
    }
  }

  TAGS_DIV = {
    create: function(attached_tags, available_tags){

      available_tags_list = "<select id='available_tags_list'>";
      if(available_tags.length > 0)
      {
        for (var tag_index = 0; tag_index < available_tags.length; tag_index++) {
          available_tags_list += "<option value="+ available_tags[tag_index] + (tag_index == 0 ? " selected='selected'" : '') + ">" + available_tags[tag_index] + "</option>"
        };
      }
      available_tags_list += "</select><br>"


      var attached_tags_list = "<ul id='attached_tags_list'>";
      for (var tag_index = 0; tag_index < attached_tags.length; tag_index++) {
          attached_tags_list += "<li>" + attached_tags[tag_index] + "</li>"
      };
      attached_tags_list += "</ul>";


      return "<div class='tag_table'>" +
                "<input id='add_tag_text' type=text name='add_tag' placeholder='attach new tag'></input>" +
                "<button id='add_tag_button' type='button'>Add Tag</button>" +
                available_tags_list +
                attached_tags_list +
              "</div>"
    },

    bindEvents: function(){
      $('#add_tag_button').click(function(e){
         e.preventDefault();

         tag_text_box = $('#add_tag_text')
         tag_name = tag_text_box.val();

        if(tag_name == "")
          return false;

        has_no_errors = true;
         // go through each of the existing tags and make sure new one doesn't exist
         $('#attached_tags_list li').each(function(){
            if($(this).text() == tag_name)
            {
              console.log('1) found in #attached_tags_list li')
              // tag_text_box.Error({'error': "tag_name_error", 'name': tag_name})
              has_no_errors = false;
            }
         });
        $('#available_tags_list option').each(function(){
          if($(this).attr('value') == tag_name)
          {
            console.log('2) found in #available_tags_list option')
            // tag_text_box.Error({'error': "tag_name_error", 'name': tag_name})
            has_no_errors = false;
          }
        });

        if(has_no_errors)
        {
          // if it doesn't exist already then clear the text box and
          console.log('No errors found ')

          tag_text_box.val("");
          new_tag_str = "<li>" + tag_name + "</li>"
          $('#attached_tags_list').append(new_tag_str)
          console.log('wtf? ')

          updateTagsViaAjax('add', tag_name);
        }
      });

      // if user selects an existing tag, then add it to attached_tags_list and remove from available_tags_list
      $('#available_tags_list').change(function(e){
        selected_tag = $('#available_tags_list :selected')
        tag_name = selected_tag.val();
        new_tag_str = "<li>" + tag_name + "</li>";
        $('#attached_tags_list').append(new_tag_str);
        selected_tag.remove();
        updateTagsViaAjax('add', tag_name);
      });


      // put attached_tags_list item back in available_tags_list if clicked on
      $('#attached_tags_list').on( 'click', ' li',  function(){
        var removing_tag_name = this.innerHTML;
        $('#attached_tags_list li:contains('+ removing_tag_name +')').remove();
        removing_tag_name_str = "<option value=" + removing_tag_name +">" + removing_tag_name + "</option>";
        $('#available_tags_list').append(removing_tag_name_str);
        updateTagsViaAjax('remove', removing_tag_name);
      });
    },

    // does nothing at the moment
    Error: function(args_hash) {
      if(type == 'tag_name_error')
        console.log('tag' + args_hash['name'] + "already exists" )
    }

    // chooseExistingTag: function(){}

  };


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
               "<br>" +
               GO_TO_SITE_LINK +
               "<button id='delete' type='button'>Delete Url</button>" +
               TAGS_DIV.create(['one', 'two', 'three'],['four', 'five', 'six']) +
              "</div>"
    },

    bindEvents: function()
    {
      $('body#Joe_Chrome_Extension_No_Touchie button#delete').click(function()
      {
        deleteUrlViaAjax();
      });

      $("a:contains('Go To Site')").click(function(e){
          e.preventDefault();
          chrome.tabs.create({'url': HOST}, function(){})
      });


      var url = HOST + "sites/1/update"
      var here = window.CURRENT_URL // //dejegjfnadffbamjjnnfccbngkpghcbi/popup.html
      $('body#Joe_Chrome_Extension_No_Touchie select').change(function(e){
        e.preventDefault();
        xhr = $.ajax({
          type: "post",
          url: url,
          data: {read_status: $("body#Joe_Chrome_Extension_No_Touchie :selected").val(), 'url': here },
          crossDomain: true,
          xhrFields: {
            withCredentials: true
          }
        }, 'text')
        .always(function(response_val)
        {
          console.log('select updated to : ' + response_val)
        });
      });

      TAGS_DIV.bindEvents();
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
        saveUrlViaAjax();
      });
    }
  };

  var saveUrlViaAjax = function()
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
      data: {'url': here},
      crossDomain: true,
      xhrFields: {
        withCredentials: true
      }
    }, 'json')
      .always(function(response_val){
        checkIfUrlAlreadySaved()
      });
  }

  var updateTagsViaAjax = function(add_or_remove, tag_name)
  {

    var here = window.CURRENT_URL

    var url = HOST + "tags/" + add_or_remove;

   console.log('save request')
    xhr = $.ajax({
      type: 'post',
      url: url,
      data: {'url': here, 'tag': tag_name},
      crossDomain: true,
      xhrFields: {
        withCredentials: true
      }
    }, 'json')
      // .always(function(response_val){
      //   console.log(add_change_or_remove + ' of ' + tag_name + ' completed!')
      // });
  }


  var deleteUrlViaAjax = function(callback)
  {
    console.log('start deleteUrlViaAjax()')
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
      data: {'url': here},
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
      data: { 'url': here },
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

