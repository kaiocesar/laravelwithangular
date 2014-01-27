/**
 * Copyright 2012 Evernote Corporation.
 */

require
    .config({
      baseUrl : "/redesign/global/js",
      config : {
        "moment" : {
          noGlobal : true
        },
        "text" : {
        }
      },
      paths : {
        /* In Alphabetical Order */
        "adyen-encrypt":"adyen/adyen.encrypt.min",
        "aes-crypto" : "aes-crypto",
        "auto-approve-domains" : "auto-approve-domains",
        "billing" : "evernoteClient/Billing",
        "businessEmailInviteBox" : "businessEmailInviteBox",
        "market-cart" : "cart",
        "checkout" : "evernoteClient/Checkout",
        "collapse" : "collapse",
        "common" : "common",
        "contacts-autocomplete" : "evernoteClient/Contacts.autocomplete",
        "cookies" : "cookies",
        "customize-sponsor" : "evernoteClient/customize_sponsor",
        "dataTableRequest" : "evernoteClient/JQueryDataTableRequest",
        "dataTableResponse" : "evernoteClient/JQueryDataTableResponse",
        "decrypt" : "decrypt",
        "domReady" : "requirePlugins/domReady.min",
        "easyXDM" : "easyXDM/easyXDM.min",
        "email-parser" : "email-parser/email-parser",
        "en-locale" : "en-locale",
        "experiment" : "experiment",
        "fieldValidator" : "fieldvalidator",
        "first-launch" : "first-launch",
        "flash-detect" : "flash_detect",
        "flip" : "jquery.flip.min",
        "ga-util" : "google-analytics-util",
        "go-premium-dialog" : "GoPremiumDialog/go-premium-dialog",
        "googleConnect" : "googleConnect",
        "hashtable" : "hashtable",
        "hashset" : "hashset",
        "header" : "header",
        "heap" : "heap",
        "helpIconFix" : "helpiconfix",
        "i18n" : "evernoteClient/i18n2",
        "imageGallery" : "imageGallery",
        "jquery" : "jquery-1.8.0",
        "jquery-autoresize" : "jquery/autoresize.jquery.min",
        "jquery-fileupload" : "file-upload/jquery.fileupload",
        "jquery-iframe-transport" : "file-upload/jquery.iframe-transport",
        "jquery-jcrop" : "jcrop/jquery.Jcrop",
        "jquery-ui" : "jquery/ui/jquery-ui-1.9.2.custom.min",
        "jquery-form" : "jquery/jquery.form",
        "jquery-serializeObject" : "jquery/jquery.serializeObject",
        "jquery-tap" : "jquery/jquery.tap",
        "jqueryENDatatables" : "jquery.evernote_dataTables.min",
        "json2" : "json2/json2.min",
        "jsonrpc" : "jsonrpc-1.3.1/jsonrpc",
        "lightbox" : "lightbox",
        "linkedNotebooksHelper" : "linked-notebooks",
        "local-storage" : "local-storage",
        "lozenge" : "lozenge/lozenge",
        "manageSponsor" : "evernoteClient/manageSponsorUsers2",
        "market-header" : "marketHeader",
        "moment" : "moment/moment",
        "moment-lang" : "moment/lang",
        "moment-l10n" : "moment/moment-l10n",
        "paginate" : "paginate",
        "parse-util" : "email-parser/parse-util",
        "parse-names" : "parse-names",
        "password-changed-dialog" : "PasswordChangedDialog/password-changed-dialog",
        "password-strength" : "password-strength",
        "pdf" : "pdf",
        "pdf-compatibility" : "pdf-compatibility",
        "pdf-renderer" : "pdf-renderer",
        "pdf-worker" : "pdf-worker",
        "quick-register" : "quick-register",
        "recent-contacts" : "recent-contacts",
        "responsiveTables" : "responsiveTables/responsive-tables",
        "security" : "security",
        "select-box" : "select-box",
        "SelectorBuilder" : "SelectorBuilder",
        "sjlc" : "sjlc",
        "shared-notebooks" : "shared-notebooks",
        "simpledateformat" : "simpledateformat",
        "sponsorCheckout" : "evernoteClient/SponsorCheckout",
        "sponsor-uri-check" : "evernoteClient/sponsor_uri_check",
        "templates" : "icanhaz",
        "text" : "requirePlugins/text",
        "textext" : "textExt_1.3.0",
        "tinycarousel" : "jquery.tinycarousel",
        "tsort" : "tinysort_1.3.27.min",
        "underscore" : "underscore-min",
        "zero-clipboard" : "zero-clipboard/zero-clipboard",

        /* Path Prefixes */
        "ebh" : "../../business/BusinessHomeAction",

        "EbhNotebookTestPresenter" : "../../business/BusinessHomeAction/js/redesign/NotebookTestPresenter",
        "EbhMinimalUserPresenter" : "../../business/BusinessHomeAction/js/redesign/MinimalUserPresenter",
        "EbhRedesignUserPresenter" : "../../business/BusinessHomeAction/js/redesign/UserPresenter",
        "EbhRedesignNotebookPresenter" : "../../business/BusinessHomeAction/js/redesign/NotebookPresenter",
        "EbhPresenter" : "../../business/BusinessHomeAction/js/framework/Presenter",
        "EbhAbstractPresenter" : "../../business/BusinessHomeAction/js/redesign/EbhAbstractPresenter",
        "IphoneBusinessHomePresenter" : "../../business/BusinessHomeAction/js/redesign/ios/iphone/IphoneBusinessHomePresenter",
        "EbhIpadBusinessHomePresenter" : "../../business/BusinessHomeAction/js/redesign/ios/ipad/IpadBusinessHomePresenter",
        "IosHeaderPresenter" : "../../business/BusinessHomeAction/js/redesign/ios/IosHeaderPresenter",
        "IosNotebookListPresenter" : "../../business/BusinessHomeAction/js/redesign/ios/IosNotebookListPresenter",
        "IosNotebookListElementPresenter" : "../../business/BusinessHomeAction/js/redesign/ios/IosNotebookListElementPresenter",
        "IosNotebookDetailPresenter" : "../../business/BusinessHomeAction/js/redesign/ios/IosNotebookDetailPresenter",
        "UserNamePresenter" : "../../business/BusinessHomeAction/js/redesign/user/UserNamePresenter",
        "NotebookJoinedBadgePresenter" : "../../business/BusinessHomeAction/js/redesign/notebook/NotebookJoinedBadgePresenter",
        "EbhIpadNotebookDetailLightboxPresenter" :  "../../business/BusinessHomeAction/js/redesign/ios/ipad/IpadNotebookDetailLightboxPresenter",
        "EbhIpadHeaderPresenter" :  "../../business/BusinessHomeAction/js/redesign/ios/ipad/IpadHeaderPresenter",
        "EbhIphoneHeaderPresenter" :  "../../business/BusinessHomeAction/js/redesign/ios/iphone/IphoneHeaderPresenter",
        "EbhIphoneHeaderNotebookListPresenter" :  "../../business/BusinessHomeAction/js/redesign/ios/iphone/IphoneHeaderNotebookListPresenter",
        "EbhIphoneHeaderNotebookDetailPresenter" :  "../../business/BusinessHomeAction/js/redesign/ios/iphone/IphoneHeaderNotebookDetailPresenter",
        "EbhIosBusinessHomePresenter" : "../../business/BusinessHomeAction/js/redesign/ios/IosBusinessHomePresenter",
        "EbhNotebookListEmptyStateItemPresenter" : "../../business/BusinessHomeAction/js/redesign/ios/IosNotebookListEmptyStateItemPresenter",

        /* Business Home Android */
        "EbhAndroidBusinessHomePresenter" : "../../business/BusinessHomeAction/js/redesign/android/AndroidBusinessHomePresenter",
        "EbhAndroidNotebookDetailPresenter" : "../../business/BusinessHomeAction/js/redesign/android/AndroidNotebookDetailPresenter",
        "EbhAndroidNotebookListViewPresenter" : "../../business/BusinessHomeAction/js/redesign/android/AndroidNotebookListViewPresenter",
        "EbhAndroidNotebookListItemsPresenter" : "../../business/BusinessHomeAction/js/redesign/android/AndroidNotebookListItemsPresenter",
        "EbhAndroidNotebookListItemPresenter" : "../../business/BusinessHomeAction/js/redesign/android/AndroidNotebookListItemPresenter",
        "EbhAndroidNotebookListEmptyPresenter" : "../../business/BusinessHomeAction/js/redesign/android/AndroidNotebookListEmptyPresenter",
        "EbhAndroidPhoneBusinessHomePresenter" : "../../business/BusinessHomeAction/js/redesign/android/phone/AndroidPhoneBusinessHomePresenter",
        "EbhAndroidPhoneNotebookDetailViewPresenter" : "../../business/BusinessHomeAction/js/redesign/android/phone/AndroidPhoneNotebookDetailViewPresenter",
        "EbhAndroidTabletBusinessHomePresenter" : "../../business/BusinessHomeAction/js/redesign/android/tablet/AndroidTabletBusinessHomePresenter",
        "EbhAndroidTabletNotebookDetailLightboxPresenter" : "../../business/BusinessHomeAction/js/redesign/android/tablet/AndroidTabletNotebookDetailLightboxPresenter",

        /* Business Home JS */
        "EbhData" : "../../business/BusinessHomeAction/js/BusinessHome.EbhData",
        "EbhEventManager" : "../../business/BusinessHomeAction/js/BusinessHome.EbhEventManager",
        "EbhListLazyLoader" : "../../business/BusinessHomeAction/js/BusinessHome.ListLazyLoader",
        "EbhNote" : "../../business/BusinessHomeAction/js/BusinessHome.Note",
        "EbhNotebook" : "../../business/BusinessHomeAction/js/BusinessHome.Notebook",
        "EbhSharedNotebook" : "../../business/BusinessHomeAction/js/BusinessHome.SharedNotebook",
        "EbhScrollLoader" : "../../business/BusinessHomeAction/js/BusinessHome.ScrollLoader",
        "EbhTenaciousRequest" : "../../business/BusinessHomeAction/js/BusinessHome.TenaciousRequest",
        "EbhUser" : "../../business/BusinessHomeAction/js/BusinessHome.User",
        "EbhUtil" : "../../business/BusinessHomeAction/js/BusinessHome.Util",
        "EbhSearchPresenter" : "../../business/BusinessHomeAction/js/BusinessHome.SearchPresenter",
        "EbhNotebookPresenter" : "../../business/BusinessHomeAction/js/BusinessHome.NotebookPresenter",
        "EbhUserPresenter" : "../../business/BusinessHomeAction/js/BusinessHome.UserPresenter",
        "EbhNotePreviewManager" : "../../business/BusinessHomeAction/js/BusinessHome.NotePreviewManager",
        "EbhSortManager" : "../../business/BusinessHomeAction/js/BusinessHome.SortManager",
        "EbhTourPresenter" : "../../business/BusinessHomeAction/js/BusinessHome.TourPresenter",
        "EbhPluralizer" : "../../business/BusinessHomeAction/js/BusinessHome.Pluralizer",
        "EbhInviteToBusinessManager" : "../../business/BusinessHomeAction/js/BusinessHome.InviteToBusinessManager",
        "EbhLinkedNotebook" : "../../business/BusinessHomeAction/js/BusinessHome.LinkedNotebook",
        "EbhToastManager" : "../../business/BusinessHomeAction/js/BusinessHome.ToastManager"
      },
      /*
       * Legacy libraries that have dependencies but don't define them through
       * require go here
       */
      shim : {
        "billing" : [ 'jquery' ],
        "checkout" : [ 'jquery' ],
        "collapse" : [ 'jquery' ],
        "customize-sponsor" : [ 'jquery' ],
        "dataTableRequest" : [ 'jquery' ],
        "dataTableResponse" : [ 'jquery' ],
        "decrypt" : {
          exports: function() {
            return this.ENCrypt;
          }
        },
        "jquery-autoresize" : [ 'jquery' ],
        "jquery-ui" : [ 'jquery' ],
        "jquery-form" : [ 'jquery' ],
        "jquery-serializeObject" : [ 'jquery' ],
        "jqueryENDatatables" : [ 'jquery', 'dataTableRequest',
            'dataTableResponse' ],
        "jsonrpc" : [ 'json2' ],
        "password-strength" : [ 'jquery' ],
        "sponsorCheckout" : [ 'jquery' ],
        "sponsor-uri-check" : [ 'jquery' ],
        "textext" : ['jquery', 'json2'],
        "tinycarousel" : [ 'jquery' ],
        "tsort" : [ 'jquery' ],

        "zero-clipboard" : {
          exports : function() {
            this.ZeroClipboard
                .setMoviePath("/redesign/global/js/zeroClipboard/ZeroClipboard.swf");
            return this.ZeroClipboard;
          }
        }
      },
      waitSeconds : 60
    // domReady sometimes times out if page load is exceptionally long (e.g. in
    // the webclient).
    });

/* Define reference to Evernote object for legacy libraries. */
var Evernote;

if (!Evernote) {
  Evernote = {};
}
