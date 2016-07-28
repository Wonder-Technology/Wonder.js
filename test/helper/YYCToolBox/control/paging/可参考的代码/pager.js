var renderPage = function(total, page, numofpage, callback) {
	var max_page = Math.ceil(total / numofpage), page_pre = page * 1 - 1 > 0 ? page * 1 - 1
			: 1, page_next = page * 1 + 1 > max_page ? max_page : page * 1 + 1;
	if (max_page > 1) {
		var html = '<a href="javascript:void(0);" title="上一页" class="page_pre" page="'
				+ page_pre + '"><i class="ico page_arrow_l"></i></a>';

		var start = 1, end = max_page, aso = '';

		if (max_page > 10) {
			start = page - 2;
			start = start > 1 ? start : 1;
			end = page - 0 + 2;
			end = end > max_page ? max_page : end;
		}

		for ( var i = 1; i <= max_page; i++) {
			if (i == page) {
				html += '<a href="javascript:void(0);" class="current"><span>'
						+ i + '</span></a>';
			} else {
				if (i == 1 || i == max_page || (i >= start && i <= end)) {
					html += '<a href="javascript:void(0);" page="' + i
							+ '"><span>' + i + '</span></a>';
					aso = '...'
				} else {
					html += aso;
					aso = '';
				}
			}
		}
		html += '<a href="javascript:void(0);" title="下一页" class="page_next" page="'
				+ page_next + '"><i class="ico page_arrow_r"></i></a>';

		$('.mod_page_nav').html(html).show();
		if (callback) {
			$('.mod_page_nav a').unbind().click(function() {
				var cur_page = $(this).attr('page');
				if (cur_page) {
					callback(cur_page);
				}
			});
		}
	} else {
		$('.mod_page_nav').hide();
	}
};
