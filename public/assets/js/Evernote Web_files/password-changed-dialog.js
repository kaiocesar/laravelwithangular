define(
    [ 'common', 'lightbox', 'templates', 'i18n' ],
    function(common, lightbox, templates, i18n) {
      var $document = $(document);
      var me = {};
      var DIALOG_TEMPLATE = '<div class="password-changed"> \
        <div class="ext-padding"> \
           <div class="dialog-header"> \
             <h1>{{title}}</h1> \
           </div> \
           <div class="content">{{content}}</div> \
           <div id="revokeMessage">{{{revokeMessage}}}</div> \
           <div class="submission-options"> \
             <div id="closePasswordChanged" class="emphasize general-button"> \
               {{closeMessage}} \
             </div> \
           </div> \
         </div> \
        </div>';
      templates.addTemplate('passwordChangeDialog', DIALOG_TEMPLATE);
      common
          .loadCss('/redesign/global/js/PasswordChangedDialog/password-changed-dialog.css');
      me.show = function() {
        i18n.done(function(i18n) {
          lightbox.showWithContent(templates
              .passwordChangeDialog({
                title : i18n.L('PasswordChangedDialog.title'),
                content : i18n.L('PasswordChangedDialog.message'),
                revokeMessage : i18n
                    .L('PasswordChangedDialog.revoke.message',
                        [ '<a href="/AuthorizedServices.action">'
                            + i18n.L('PasswordChangedDialog.applications')
                            + '</a>' ]),
                revokeMessageLinkText : i18n
                    .L('PasswordChangedDialog.revoke.message.2'),
                revokeMessageEnd : i18n
                    .L('PasswordChangedDialog.revoke.message.3'),
                closeMessage : i18n.L('ok')
              }), {
            fullscreenIfSmall : true
          });
        });
      };

      me.hide = function() {
        lightbox.close();
      };

      me.onclose = lightbox.onclose;

      $document.on('click', '#closePasswordChanged', function(event) {
        me.hide();
      });

      return me;
    });
