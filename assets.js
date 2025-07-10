// Import all static assets for bundling
import indexHtml from './public/index.html' with { type: 'text' };
import aboutHtml from './public/views/about.html' with { type: 'text' };
import contactHtml from './public/views/contact.html' with { type: 'text' };
import missionHtml from './public/views/mission.html' with { type: 'text' };
import resourcesHtml from './public/views/resources.html' with { type: 'text' };
import serveHtml from './public/views/serve.html' with { type: 'text' };
import teamHtml from './public/views/team.html' with { type: 'text' };

// Import partials
import aboutFamilyModalHtml from './public/views/partials/_about-family-modal.html' with { type: 'text' };
import aboutGospelModalHtml from './public/views/partials/_about-gospel-modal.html' with { type: 'text' };
import aboutWayModalHtml from './public/views/partials/_about-way-modal.html' with { type: 'text' };
import statementsFaithHtml from './public/views/partials/_statements-of-faith.html' with { type: 'text' };

// Import CSS files
import baseCss from './public/css/base.css' with { type: 'text' };
import blessCss from './public/css/bless.css' with { type: 'text' };
import flexsliderCss from './public/css/flexslider.css' with { type: 'text' };
import fontAwesomeCss from './public/css/font-awesome.min.css' with { type: 'text' };
import layoutCss from './public/css/layout.css' with { type: 'text' };
import prettyPhotoCss from './public/css/prettyPhoto.css' with { type: 'text' };
import skeletonCss from './public/css/skeleton.css' with { type: 'text' };
import styleCss from './public/css/style.css' with { type: 'text' };

// Import JavaScript files
import contactFormJs from './public/scripts/contact-form.js' with { type: 'text' };
import jqueryJs from './public/scripts/jquery-1.6.2.min.js' with { type: 'text' };
import jqueryUiJs from './public/scripts/jquery-ui-1.8.11.min.js' with { type: 'text' };
import flexsliderJs from './public/scripts/jquery.flexslider.js' with { type: 'text' };
import inviewJs from './public/scripts/jquery.inview.js' with { type: 'text' };
import prettyPhotoJs from './public/scripts/jquery.prettyPhoto.js' with { type: 'text' };
import stickyJs from './public/scripts/jquery.sticky.js' with { type: 'text' };
import knockoutJs from './public/scripts/knockout-2.0.0.js' with { type: 'text' };
import modernizrJs from './public/scripts/modernizr-2.0.6-development-only.js' with { type: 'text' };
import parallaxJs from './public/scripts/nbw-parallax.js' with { type: 'text' };
import smoothScrollJs from './public/scripts/smooth-scroll.js' with { type: 'text' };

// Import component files
import appJs from './public/components/app.js' with { type: 'text' };
import controllersJs from './public/components/controllers.js' with { type: 'text' };
import directivesJs from './public/components/directives.js' with { type: 'text' };
import filtersJs from './public/components/filters.js' with { type: 'text' };
import servicesJs from './public/components/services.js' with { type: 'text' };

// Binary assets need to be imported as files
import faviconIco from './public/favicon.ico';
import logoUrl from './public/images/logo.png';
import bannerUrl from './public/images/banner.jpg';
import familyUrl from './public/images/family.jpg';
import gospelUrl from './public/images/gospel.jpg';
import wayUrl from './public/images/way.jpg';
import rootsUrl from './public/images/roots.jpg';

export const assets = {
  // HTML files
  html: {
    'index.html': indexHtml,
    'views/about.html': aboutHtml,
    'views/contact.html': contactHtml,
    'views/mission.html': missionHtml,
    'views/resources.html': resourcesHtml,
    'views/serve.html': serveHtml,
    'views/team.html': teamHtml,
    'views/partials/_about-family-modal.html': aboutFamilyModalHtml,
    'views/partials/_about-gospel-modal.html': aboutGospelModalHtml,
    'views/partials/_about-way-modal.html': aboutWayModalHtml,
    'views/partials/_statements-of-faith.html': statementsFaithHtml,
  },
  
  // CSS files
  css: {
    'base.css': baseCss,
    'bless.css': blessCss,
    'flexslider.css': flexsliderCss,
    'font-awesome.min.css': fontAwesomeCss,
    'layout.css': layoutCss,
    'prettyPhoto.css': prettyPhotoCss,
    'skeleton.css': skeletonCss,
    'style.css': styleCss,
  },
  
  // JavaScript files
  scripts: {
    'contact-form.js': contactFormJs,
    'jquery-1.6.2.min.js': jqueryJs,
    'jquery-ui-1.8.11.min.js': jqueryUiJs,
    'jquery.flexslider.js': flexsliderJs,
    'jquery.inview.js': inviewJs,
    'jquery.prettyPhoto.js': prettyPhotoJs,
    'jquery.sticky.js': stickyJs,
    'knockout-2.0.0.js': knockoutJs,
    'modernizr-2.0.6-development-only.js': modernizrJs,
    'nbw-parallax.js': parallaxJs,
    'smooth-scroll.js': smoothScrollJs,
  },
  
  // Component files
  components: {
    'app.js': appJs,
    'controllers.js': controllersJs,
    'directives.js': directivesJs,
    'filters.js': filtersJs,
    'services.js': servicesJs,
  },
  
  // Binary assets
  images: {
    'favicon.ico': faviconIco,
    'logo.png': logoUrl,
    'banner.jpg': bannerUrl,
    'family.jpg': familyUrl,
    'gospel.jpg': gospelUrl,
    'way.jpg': wayUrl,
    'roots.jpg': rootsUrl,
  }
};