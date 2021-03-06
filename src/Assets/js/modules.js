/*
 * --------------------------------------------------------------------------
 * General
 * --------------------------------------------------------------------------
*/

$(document).ready(function () {
    $('[data-toggle="tooltip"]').tooltip();
});

/*
 * --------------------------------------------------------------------------
 * Links
 * --------------------------------------------------------------------------
*/

if ($('#External').is(':checked')) {
    $('#External_url').parent().show();
    $('#Page_id').parent().hide();
} else {
    $('#External_url').parent().hide();
    $('#Page_id').parent().show();
}

$(window).ready(function(){
    $('#External').bind('click', function() {
        if ($(this).is(':checked')) {
            $('#External_url').parent().show();
            $('#Page_id').parent().hide();
        } else {
            $('#External_url').parent().hide();
            $('#Page_id').parent().show();
        }
    });
});

var linkList = document.getElementById('linkList');

if (typeof linkList != 'undefined') {
    var sortable = Sortable.create(linkList, {
        store: {
            get: function (sortable) {
                return _linkOrder ? _linkOrder : [];
            },

            set: function (sortable) {
                var _order = sortable.toArray();
                $.ajax({
                    url: _quarxUrl + '/menus/' + _id + '/order',
                    type: 'put',
                    data: {
                        _token: _token,
                        order: JSON.stringify(_order)
                    },
                    success: function (_data) {
                        // do nothing!
                    }
                });
            }
        }
    });
}

/*
 * --------------------------------------------------------------------------
 * Files
 * --------------------------------------------------------------------------
*/

$(function(){

    $('#saveFilesBtn').click(function(e){
        e.preventDefault();
        Dropzone.forElement('.dropzone').processQueue();
    });

});

function confirmDelete (url) {
    $('#deleteBtn').attr('href', url);
    $('#deleteModal').modal('toggle');
}

/*
 * --------------------------------------------------------------------------
 * Images
 * --------------------------------------------------------------------------
*/

$(function(){

    $('#saveImagesBtn').click(function(e){
        e.preventDefault();
        Dropzone.forElement('.dropzone').processQueue();
    });

});

/*
 * --------------------------------------------------------------------------
 * Previews
 * --------------------------------------------------------------------------
*/

$('.preview-toggle').bind('click', function () {
    if ($(this).attr('data-platform') == 'desktop') {
        $('#frame').css({
            width: '150%'
        });
    }
    if ($(this).attr('data-platform') == 'mobile') {
        $('#frame').css({
            width: '320px'
        });
    }
});

$('#frame').load(function () {
    var frameBody = $('#frame').contents().find('body');
    $('a', frameBody).click(function(e){
        e.preventDefault();
    });
});

/*
 * --------------------------------------------------------------------------
 * Pages and Blocks
 * --------------------------------------------------------------------------
*/

$(function () {
    $('.add-block-btn').bind('click', function (e) {
        e.preventDefault();
        $('#blockName').val('');
        $('#addBlockModal').modal('toggle');
    });

    $('#addBlockBtn').bind('click', function () {
        var _slug = $('#blockName').val();
        $('.blocks').prepend('<div id="block_container_'+_slug+'" class="col-md-12"><div class="form-group"><h4>'+_slug+'<button type="button" class="btn btn-xs btn-danger delete-block-btn pull-right"><span class="fa fa-trash"></span></button></h4><textarea id="block_'+_slug+'" name="block_'+_slug+'" class="form-control redactor"></textarea></div></div>');
        $('#addBlockModal').modal('toggle');
        $('#block_'+_slug).redactor(_redactorConfig);
    });

    $('.delete-block-btn').bind('click', function (e) {
        e.preventDefault();
        $('#deleteBlockBtn').attr('data-slug', $(this).attr('data-slug'));
        $('#deleteBlockModal').modal('toggle');
    });

    $('#deleteBlockBtn').bind('click', function () {
        $('#'+$(this).attr('data-slug')).remove();
        $('#deleteBlockModal').modal('toggle');
    });
});
