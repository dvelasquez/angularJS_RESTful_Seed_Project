angular.module('sdk.filters')	

.filter('Template', function ($log,$interpolate) {
	return function (template, parameters) {

            var exp = $interpolate(template);
            var content = exp({
            	data: parameters
            });
           
           return content;
	};
});