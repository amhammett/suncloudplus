/* 
 * suncrop cloud plus
 */

/* called via

var script = document.createElement( 'script' );
script.type = 'text/javascript';
script.src = "https://assetsdev.sun.cloud/new-media/suncrop-cloud-plus/js/scp.js";
document.body.appendChild(script);

*/

resource_location="https://assetsdev.sun.cloud/new-media/suncrop-cloud-plus/";
resource_location="";
var data;

function we_have_the_technology() {
  return true;
}

if(we_have_the_technology()){
  // magic starts here

  // stage 2
  hide_legacy();
  //show_loading();
  data=get_instance_map()
  //remove_legacy()
  //  html and css

  build_suncloud_plus()



  // stage 1
  nice_ify_css();
  //add_metro();
  enable_legacy_menu();

  update_metro_menu(data);
  add_metro_events();
}

function hide_legacy() {
  $('.page').hide();
}

function build_suncloud_plus() {
  var suncorpplus='<div id="suncloudplus" class="metrouicss"> \
    <div id="scp_header"></div> \
    <div id="scp_body"></div> \
    <div id="scp_footer"></div> \
  </div>';
  $('body').prepend(suncorpplus);

  build_header();
  build_body();
  build_footer();
}
function build_body() {
  var heading="";
  $('#scp_body').append(heading);
  // split map into regions.
  var accordion_lis='';

  for(i in data.regions) {
    var li_data='';
    var region= data.regions[i];

    for (j in data.instances) {
      var site = data.instances[j];

      if(site.region===region) {
        li_data+='<div class="tile" \
          data-sites="'+site.site+'"\
          data-ports="'+site.port+'"\
          data-hosts="'+site.host+'"\
          data-regions="'+site.region+'"\
          ><a href="'+site.url+'"> \
            <span class="site"> '+ site.site +' </span> \
            <span class="host"> '+ site.host +' </span> \
            <span class="port"> '+ site.port +' </span> \
            <span class="status"> '+ site.status +' </span> \
          </a></div>';
      }
    }
    accordion_lis+='<li class="active '+region+'"><a>'+region+'</a> \
        <div>'+li_data+'<div class="clear"></div></div> \
      </li>';
  }

  accordion = '<ul class="accordion dark" data-role="accordion">'+accordion_lis+'</ul>';

  $('#scp_body').append(accordion);
}
function build_footer() {}

/***********************************************
 * nice_ify_css()
 ************************************************/
function nice_ify_css() {
  $(".header .hideSkiplink ").hide();
  $('.waiting').hide();
}

/***********************************************
 * add_metro()
 ************************************************/
function build_header() {
  add_metro_menu();
  add_metro_heading();
}

function add_metro_menu() {
  $('body').append(get_metro_menu_assets());
  $('#scp_header').append(get_metro_menu_html());
}

function get_metro_menu_assets() {
  assets='<link href="'+resource_location+'css/modern.css" rel="stylesheet"> \
    <link href="'+resource_location+'css/scp.css" rel="stylesheet"> \
    <script type="text/javascript" src="'+resource_location+'js/lib/jquery-1.8.3.min.js"></script> \
    <script type="text/javascript" src="'+resource_location+'js/dropdown.js"></script> \
    <script type="text/javascript" src="'+resource_location+'js/accordion.js"></script>';
   return assets;
}

function get_metro_menu_html() {
  var menu_html = '\
    <div class="nav-bar"> \
      <div class="nav-bar-inner"> \
        <a href="#"> \
          <span class="element brand">Suncrop Cloud</span> \
        </a> \
        <span class="divider"></span> \
        <ul class="menu" style="overflow:visible;"> \
        <!-- this probably doesnt need to be hard coded --> \
          <li class="legacy-dash legacy-link" data-name="ctl00$MenuContent$_showProjectDeployments"><a href="#">Project Dashboard</a></li> \
          <li class="legacy-details legacy-link" data-name="ctl00$MenuContent$_showProjectDetails"><a href="#">Project Details</a></li> \
          <li class="legacy-res legacy-link" data-name="ctl00$MenuContent$_showResourceDetailsButton"><a href="#">Project Resources</a></li> \
          <li class="legacy-wiz legacy-link" data-name="ctl00$MenuContent$_showDeploymentWizard"><a href="#">Request Wizard</a></li> \
          <li data-role="dropdown" class="sites show-sites"> \
            <a>Sites</a> \
            <ul class="dropdown-menu" class="sites" style="display:none;"> \
              <li class="all_sites"><a href="#" data-sites="all_sites">All Sites</a></li> \
              <li class="divider"></li> \
              <li class="loading"><a href="#">SITES</a></li> \
            </ul> \
          </li> \
          <li data-role="dropdown" class="ports show-ports"> \
            <a>Ports</a> \
            <ul class="dropdown-menu" style="display:none;"> \
              <li class="all_ports"><a href="#" data-ports="all_ports">All Ports</a></li> \
              <li class="divider"></li> \
              <li class="loading"><a href="#">PORTS</a></li> \
            </ul> \
          </li> \
          <li data-role="dropdown" class="hosts show-hosts"> \
            <a>Hosts</a> \
            <ul class="dropdown-menu" style="display:none;"> \
              <li class="all_hosts"><a href="#" data-hosts="all_hosts">All Hosts</a></li> \
              <li class="divider"></li> \
              <li class="loading"><a href="#">HOSTS</a></li> \
            </ul> \
          </li> \
          <li data-role="dropdown" class="versions show-versions"> \
            <a>Versions</a> \
            <ul class="dropdown-menu" style="display:none;"> \
              <li class="all_versions"><a href="#" data-versions="all_versions">All Versions</a></li> \
              <li class="divider"></li> \
              <li class="loading"><a href="#">VERSIONS</a></li> \
            </ul> \
          </li> \
        </ul> \
      </div> \
    </div>';
  return menu_html;
}

function add_metro_heading() {
  var page_heading=$('#ctl00_TitleContent__projectNameLabel').text();
  var metro_header='<div class="page-header-content"><h1>'+page_heading+'</h1><a href="/" class="back-button"></a></div>';
  $('#scp_body').prepend(metro_header);
}

//function remove_legacy_header(){
//  $('.header').remove();
//}

/***********************************************
 * enable_legacy_menu()
 ************************************************/
function enable_legacy_menu() {
  $('.legacy-link a').click(function() {
    var input_name = $(this).attr('data-name');
    $('[name="'+input_name+'"]').click();
  });
}

/***********************************************
 * update_metro_menu()
 ************************************************/

function update_metro_menu() {
  function update_list_item(type) {
    var list_html=new Array();

    for(i in data[type]) {
      item=data[type][i];

      if(item) {
        list_html.push('<li><a href="#" data-'+type+'="'+item+'">'+item+'</a></li>');
      }
    }
    list_html.sort();

    $('.menu .'+type+' ul').append(list_html)
    $('.menu .'+type+' ul li.loading').remove();
  }

  for(i in {"sites":"sites", "ports":"ports", "hosts":"hosts", "versions":"versions"}) {
    update_list_item(i);
  }
}

function get_instance_map() {
  var map = {
    hosts : {},
    ports : {},
    regions : {},
    sites : {},
    instances : new Array(),
    versions : {}
  };

  $('.div-list td').each(function(index, element) {
    var site_name=$(element).find('strong:first').text()
    if(site_name != "") {
      var href=$(element).find('a').attr('href');
      var environment=$(element).parents('.div-list').parent().find('h2 span').text();
      var version = environment.split('-')[2].trim();

      if(typeof href != "undefined") {
        var region = environment.split('-')[0].trim();
        var status = "tbd";
        var instance = {
          site: site_name,
          port: href.split(':')[2],
          host: href.split(':')[1].split('/')[2],
          url: href,
          environment: environment,
          status: status,
          region: region,
          version: version
        }

        map.regions[region]=region;
        map.ports[instance.port]=instance.port;
        map.hosts[instance.host]=instance.host;
        map.sites[instance.site]=instance.site;
        map.instances.push(instance);
      }

      map.versions[version]=version;
    }
  });
 //el(map)
  return map;
}

/***********************************************
 * update_metro_menu()
 ************************************************/
function add_metro_events() {
  // show all instances for a single site

  function show_tile(search_type, search_value) {
    $('.accordion .tile').show();
    if('all_'+search_type === search_value) {return;}
    
    $('.accordion .tile').each(function(index, element) {
      if($(element).attr('data-'+search_type) != search_value) {
        $(element).hide();
      }
    });
  }

  // show all instances for a single port
  function show_hosts(site_host) {
    $('ul li').show();

    if(site_host == "all_hosts") {return;}
    $('.div-list td a').each(function(index, element) {
      if($(this).attr('href').split(':')[1].split('/')[2] != site_host) {
        $(this).parent().parent().parent().parent().parent().parent().parent().hide();
      }
    });
  }

  $('.show-sites li a').click(function() {
    show_tile('sites', $(this).attr('data-sites'));
  });

  $('.show-ports li a').click(function() {
    show_tile('ports', $(this).attr('data-ports'));
  });

  $('.show-hosts li a').click(function() {
    show_tile('hosts', $(this).attr('data-hosts'));
  });
}


function el(s) {console.log(s);}
