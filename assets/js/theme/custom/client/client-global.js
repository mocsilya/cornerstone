/**
 * Custom global client js
*/
import utils from '@bigcommerce/stencil-utils';

export default function (context) { 
	$(".cart-terms-click").click(function(e) {
		e.preventDefault();
		$(".cart-terms").hide();
	});
	
	
	if (window.location.href.indexOf('monster-index') > -1) {
		const options = {
		  template: 'custom/client/client-script-category',
		  config: { blog: { posts: { limit: 100 } } },
		};
	
		utils.api.getPage('/latest-posts', options, (error, response) => {
			const blogJson = JSON.parse(response);
			const modelComparison = blogJson.posts.filter(post => post.tags.some(tag => tag.name === 'Model Comparison'));
			modelComparison.forEach(modelComparisonPost => {
			   const html1 = `
			    <li>
			    <a href="${modelComparisonPost.url}">${modelComparisonPost.title}</a>
			    </li>
			    `;
			    $('[data-modelComparison-posts]').append(html1);
			});
			const emtbTech = blogJson.posts.filter(post => post.tags.some(tag => tag.name === 'EMTB Tech'));
			emtbTech.forEach(emtbTechPost => {
			   const html2 = `
			    <li>
			    <a href="${emtbTechPost.url}">${emtbTechPost.title}</a>
			    </li>
			    `;
			    $('[data-emtbTech-posts]').append(html2);
			});
			const bikeTech = blogJson.posts.filter(post => post.tags.some(tag => tag.name === 'Bike Tech'));
			bikeTech.forEach(bikeTechPost => {
			   const html3 = `
			    <li>
			    <a href="${bikeTechPost.url}">${bikeTechPost.title}</a>
			    </li>
			    `;
			    $('[data-bikeTech-posts]').append(html3);
			});
			const setupMaintenance = blogJson.posts.filter(post => post.tags.some(tag => tag.name === 'Setup & Maintenance'));
			setupMaintenance.forEach(setupMaintenancePost => {
			   const html4 = `
			    <li>
			    <a href="${setupMaintenancePost.url}">${setupMaintenancePost.title}</a>
			    </li>
			    `;
			    $('[data-setupMaintenance-posts]').append(html4);
			});
			const newtoMtb = blogJson.posts.filter(post => post.tags.some(tag => tag.name === 'New to MTB & EMTB'));
			newtoMtb.forEach(newtoMtbPost => {
			   const html5 = `
			    <li>
			    <a href="${newtoMtbPost.url}">${newtoMtbPost.title}</a>
			    </li>
			    `;
			    $('[data-newtoMtb-posts]').append(html5);
			});
			const wheretoRide = blogJson.posts.filter(post => post.tags.some(tag => tag.name === 'Where to Ride & Race'));
			wheretoRide.forEach(wheretoRidePost => {
			   const html6 = `
			    <li>
			    <a href="${wheretoRidePost.url}">${wheretoRidePost.title}</a>
			    </li>
			    `;
			    $('[data-wheretoRide-posts]').append(html6);
			});
		});
	}
	
}
