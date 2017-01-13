import Telescope from 'meteor/nova:lib';
import React from 'react';

const Page = ({document, currentUser}) => {

  const page = document;

  switch(page.slug)  {

  	case 'homepage':
  		return <div className="page"><Telescope.components.PageTemplateHome page={page}/></div>;
  	case 'about':
  		return <div className="page"><Telescope.components.PageTemplateAbout page={page}/></div>;
  	case 'membership':
  		return <div className="page"><Telescope.components.PageTemplateMembership page={page}/></div>;
  	case 'allies':
  		return <div className="page"><Telescope.components.PageTemplateAllies page={page}/></div>;  		
   	case 'press':
  		return <div className="page"><Telescope.components.PageTemplatePress page={page}/></div>; 
   	case 'terms':
  		return <div className="page"><Telescope.components.PageTemplateTerms page={page}/></div>; 
   	case 'privacy':
  		return <div className="page"><Telescope.components.PageTemplatePrivacy page={page}/></div>; 
   	case 'cookies':
  		return <div className="page"><Telescope.components.PageTemplateCookies page={page}/></div>; 
   	case 'credits':
  		return <div className="page"><Telescope.components.PageTemplateCredits page={page}/></div>;
	case 'our-mission':
		  return <div className="page"><Telescope.components.PageTemplateMission page={page}/></div>;
	case 'wifc':
		  return <div className="page"><Telescope.components.PageTemplateWIFC page={page}/></div>;
	case 'wifc-pledge':
		  return <div className="page"><Telescope.components.PageTemplateWIFCPledge page={page}/></div>;
  	default:
  		return <div className="page"><Telescope.components.PageItem page={page}/></div>;
  }


};

Page.displayName = "Page";

module.exports = Page;
export default Page;