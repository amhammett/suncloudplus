// *** suncrop cloud plus
resource_location="https://assetsdev.sun.cloud/new-media/suncrop-cloud-plus/";
resource_location="";

function we_have_the_technology() {
  return true;
}
/* called via

var script = document.createElement( 'script' );
script.type = 'text/javascript';
script.src = "https://assetsdev.sun.cloud/new-media/suncrop-cloud-plus/js/scp.js";
document.body.appendChild(script);

*/

function get_metro_menu_assets() {
  return '<link href="'+resource_location+'css/modern.css" rel="stylesheet"> <script type="text/javascript" src="'+resource_location+'js/lib/jquery-1.8.3.min.js"></script> <script type="text/javascript" src="'+resource_location+'js/dropdown.js"></script>';
}

function get_metro_menu_html() {
  return '<div class="metrouicss"> <div class="nav-bar"> <div class="nav-bar-inner"> <a href="#"><span class="element brand">suncrop Cloud</span></a> <span class="divider"></span> <ul class="menu" style="overflow:visible;"> <li class="legacy-dash"> <a href="#">Project Dashboard</a> </li> <li class="legacy-details"> <a href="#">Project Details</a> </li> <li class="legacy-res"> <a href="#">Project Resources</a> </li> <li class="legacy-wiz"> <a href="#">Request Wizard</a> </li> <li data-role="dropdown" class="sites"> <a>Sites</a> <ul class="dropdown-menu" style="display:none;"> <li><a href="#">All Sites</a></li> <li class="divider"></li> <li class="loading"><a href="#">SITES</a></li> </ul> </li> <li data-role="dropdown" class="ports"> <a>Ports</a> <ul class="dropdown-menu" style="display:none;"> <li><a href="#">All Ports</a></li> <li class="divider"></li> <li class="loading"><a href="#">PORTS</a></li> </ul> </li> <li data-role="dropdown" class="hosts"> <a>Hosts</a> <ul class="dropdown-menu" style="display:none;"> <li><a href="#">All Hosts</a></li> <li class="divider"></li> <li class="loading"><a href="#">HOSTS</a></li> </ul> </li> </ul> </div> </div> </div>';
}

function add_metro_heading() {
  var page_heading=$('#ctl00_TitleContent__projectNameLabel').text();
  $('.main').prepend('<h1>'+page_heading+'</h1>').find('h1').css({'margin': '0'})
}

function remove_legacy(){
  $('.header').remove();
}

function add_metro() {
  add_metro_menu();
  add_metro_heading();
  remove_legacy();
}

function add_metro_menu() {
  $('body').append(get_metro_menu_assets());
  $('body').prepend(get_metro_menu_html());
}

function enable_legacy_menu() {
  $('.legacy-dash a').click(function() {
    $('[name="ctl00$MenuContent$_showProjectDeployments"]').click();
  });
  $('.legacy-details a').click(function() {
    $('[name="ctl00$MenuContent$_showProjectDetails"]').click();
  });
  $('.legacy-res a').click(function() {
    $('[name="ctl00$MenuContent$_showResourceDetailsButton"]').click();
  });
  $('.legacy-wiz a').click(function() {
    $('[name="ctl00$MenuContent$_showDeploymentWizard"]').click();
  });
}

function nice_ify_css() {
  $('.page').css({
    'border':'none',
    'margin':'0',
    'width':'100%'
  });
  $('h2').css({'margin':'0'});
  $(".header .hideSkiplink ").hide();
  $("div.div-list ul").css("display","block").css("width","100%");
  $("drupal_tools_site_selector select").css("float","left");
  
  $('#drupal_tools div').css({
    'background-color':'#2C3F6A',
    'color':'#FFFFEA',
    'display':'block',
    'line-height':'1.70em',
    'padding':'2px 10px',
    'white-space':'nowrap',
    'text-decoration':'none'
  });
}

// get a list of all sites
function get_sites() {
  var sites = {}

  $('.div-list td').each(function(index, element) {
    if($(element).find('strong:first').text() != "") {
	  site_name=$(element).find('strong:first').text();
      sites[site_name]=site_name;
    }
  });

  return sites;
}

// get a list of all ports. this is lazy and should be included in sites object
function get_ports() {
  var ports = {}
  
  $('.div-list td a').each(function() {
    var port = $(this).attr('href').split(':')[2];
    ports[port]=port;
  })
  
  return ports;
}

// show all instances for a single site
function show_site(site_name) {
  $('ul li').show();

  if(site_name == "all_sites") {return;}
  
  $('.div-list td').each(function(index, element) {
    if($(element).find('strong:first').text() != site_name && $(element).find('strong:first').text() != "") {
      $(this).parent().parent().parent().parent().parent().hide();
    }
  });
}

// show all instances for a single port
function show_port(site_port) {
  $('ul li').show();

  if(site_port == "all_ports") {return;}
  
  $('.div-list td a').each(function(index, element) {
    if($(this).attr('href').split(':')[2] != site_port) {
      $(this).parent().parent().parent().parent().parent().parent().parent().hide();
    }
  });
}

function update_metro_menu() {
  update_sites_list();
  update_ports_list();
  update_hosts_list();
}

function update_sites_list() {
  var sites = get_sites();
  var site_list_html="";
  
  for(site in sites) {
    if(site) {
      site_list_html+='<li class="'+site+'"><a href="#">'+site+'</a></li>';
	}
  }
  console.log(sites);
  $('.menu .sites ul').append(site_list_html).find('.loading').hide();
}


 function update_ports_list() {}
 function  update_hosts_list() {}

// tools bar
function create_toolbar() {

  var drupal_tools='<ul class="drupal_tools">'+create_sites_tool() + create_ports_tool() + '</ul>';

  $('.menu .level1').append(drupal_tools);
}

function create_sites_tool() {
  var dt_options;
  
  for (site in get_sites()) {
    dt_options+='<li data-site="'+site+'"><a href="#">'+site+'</a></li>';
  };

  var site_selector='<ul id="dt_site_selector">' + dt_options + '</ul>';
  var site_selector_scripts="<script>$('#dt_site_selector').change(function() {show_site($('#dt_site_selector').val()); reset_selector('dt_site_selector')});</script>"

  return site_selector+site_selector_scripts;
}

function reset_selector(not_id) {
  $('.drupal_tools div select[id!="'+not_id+'"]').each(function() {
    $(this).find('option:first').attr('selected', 'true');
  });
}

function create_ports_tool() {
  var dt_options;

  for (port in get_ports()) {
    dt_options+='<li data-site="'+port+'"><a href="#">'+port+'</a></li>';
  };

  var port_selector='<ul id="dt_port_selector">' + dt_options + '</ul>';
  var port_selector_scripts="<script>$('#dt_port_selector').change(function() {show_port($('#dt_port_selector').val());reset_selector('dt_port_selector')});</script>"

  return port_selector+port_selector_scripts;
}

function get_sitemap() {
  var map = {};

  $('.div-list td').each(function(index, element) {
    var site_name=$(element).find('strong:first').text()
    if(site_name != "") {
    var href=$(element).find('a').attr('href');
      if(typeof href != "undefined") {
    console.log(href)
      var port=href.split(':')[2];
      var host='';//href.split(':')[1];
    map[port]=site_name;
    }
      
    }
  });
  
  return map;
}

if(we_have_the_technology()){
  // magic starts here
  nice_ify_css();
  add_metro();
  enable_legacy_menu();
  update_metro_menu();  
}
