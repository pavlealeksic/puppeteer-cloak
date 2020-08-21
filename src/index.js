'use strict';

/**
 * Secures the puppeteer page headless mode
 * @return {object}
 */
module.exports = function(page) {
  page.evaluateOnNewDocument(() => {
    Object.defineProperty(navigator, 'webdriver', {
      get: () => undefined, 
    });
    Object.defineProperty(window, 'onbeforeunload', {
      configurable: false,
      writeable: false,
      value: function () { }
    });
    Object.defineProperty(window, 'onunload', {
      configurable: false,
      writeable: false,
      value: function () { }
    });

    if (!window.chrome) {
      const installer = { install() { } };
      window.chrome = {
        app: { isInstalled: false },
        webstore: {
          onInstallStageChanged: {},
          onDownloadProgress: {},
          install(url, onSuccess, onFailure) {
            installer.install(url, onSuccess, onFailure);
          }
        },
        csi() { },
        loadTimes() { }
      };
    }

    if (!window.chrome.runtime) 
      window.chrome.runtime = {
        PlatformOs: {
          MAC: 'mac',
          WIN: 'win',
          ANDROID: 'android',
          CROS: 'cros',
          LINUX: 'linux',
          OPENBSD: 'openbsd'
        },
        PlatformArch: {
          ARM: 'arm',
          X86_32: 'x86-32',
          X86_64: 'x86-64',
          MIPS: 'mips',
          MIPS64: 'mips64'
        },
        PlatformNaclArch: {
          ARM: 'arm',
          X86_32: 'x86-32',
          X86_64: 'x86-64',
          MIPS: 'mips',
          MIPS64: 'mips64'
        },
        RequestUpdateCheckStatus: {
          THROTTLED: 'throttled',
          NO_UPDATE: 'no_update',
          UPDATE_AVAILABLE: 'update_available'
        },
        OnInstalledReason: {
          INSTALL: 'install',
          UPDATE: 'update',
          CHROME_UPDATE: 'chrome_update',
          SHARED_MODULE_UPDATE: 'shared_module_update'
        },
        OnRestartRequiredReason: {
          APP_UPDATE: 'app_update',
          OS_UPDATE: 'os_update',
          PERIODIC: 'periodic'
        },
        connect: function () { }.bind(function () { }),
        sendMessage: function () { }.bind(function () { })
      };
    

    if (HTMLIFrameElement.prototype.__lookupGetter__('contentWindow') == null) 
      Object.defineProperty(HTMLIFrameElement.prototype, 'contentWindow', {
        get: function () {
          return window;
        }
      });
    

    if ((navigator.plugins || []).length === 0) 
      Object.defineProperty(navigator, 'plugins', {get: () => [1, 2, 3, 4, 5]});
    

    if ((navigator.languages || []).length === 0) 
      Object.defineProperty(navigator, 'languages', {get: () => ['en-US', 'en']});
    
    const originalQuery = window.navigator.permissions.query;
    return window.navigator.permissions.query = (parameters) => (
      parameters.name === 'notifications' ?        Promise.resolve({state: Notification.permission}) :        originalQuery(parameters)
    );
  });
  return page;
};