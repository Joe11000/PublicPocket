$(function(){

  // { // Change position of side col on window resize
  //   var pxl_lg = 1170;

  //   // initial setting
  //   $(window).load(function()
  //   {
  //     if($(window).width() >= pxl_lg)
  //     {
  //       $("#side_col").addClass("sx-sm-md-side-col").removeClass("lg-side-col")
  //     }
  //     else
  //     {
  //       $("#side_col").addClass("lg-side-col").removeClass("sx-sm-md-side-col")
  //     }
  //   })

  //   // resizing
  //   $(window).resize(function()
  //   {
  //     if( $(window).width() < pxl_lg )
  //     {
  //       $("#side_col").addClass("sx-sm-md-side-col").removeClass("lg-side-col")
  //     }
  //     else
  //     {
  //       $("#side_col").addClass("lg-side-col").removeClass("sx-sm-md-side-col")
  //     }
  //   });
  // }


  { // hide tables when side_col item clicked
    $(".list-group-item").each(function()
    {
      $(this).click(function(){
        if($(this).hasClass("active"))
        {
          $(this).removeClass("active");                                 // deselect the side_col item
          table_id = "#" + this.text.match(/\W*(\w+)/)[1].toLowerCase() + "_table"   // hide cooresponding table
          $(table_id).addClass("hide")
        }
        else
        {
          $(this).addClass("active");                                   // hide cooresponding table
          table_id = "#" + this.text.match(/\W*(\w+)/)[1].toLowerCase() + "_table"
          $(table_id).removeClass("hide")
        }
      });
    });
  }
});
