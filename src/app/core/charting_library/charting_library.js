(function() {
	function l(a) {
		var b;
		if("object" !== typeof a || a.constructor && !a.hasOwnProperty("constructor") && !(a.constructor.prototype || {}).hasOwnProperty("isPrototypeOf")) return !1;
		for(b in a);
		return void 0 === b || a.hasOwnProperty(b)
	}

	function g() {
		var a, b, c, e, d, f = arguments[0] || {},
			h = 1,
			g = arguments.length,
			k = !1;
		"boolean" === typeof f && (k = f, f = arguments[h] || {}, h++);
		"object" !== typeof f && "function" !== typeof f && (f = {});
		h === g && (f = this, h--);
		for(; h < g; h++)
			if(null != (a = arguments[h]))
				for(b in a) c = f[b], e = a[b], f !== e && (k && e &&
					(l(e) || (d = Array.isArray(e))) ? (d ? (d = !1, c = c && Array.isArray(c) ? c : []) : c = c && l(c) ? c : {}, f[b] = jQuery.extend(k, c, e)) : void 0 !== e && (f[b] = e));
		return f
	}

	function m(a) {
		d.widget.prototype[a] = function(b) {
			console.warn("Method `" + a + "` is obsolete. Please use `chart." + a + "()` subscription method instead.")
		}
	}
	if(!window.TradingView) {
		var n = {
				mobile: {
					disabledFeatures: "left_toolbar header_widget timeframes_toolbar edit_buttons_in_legend context_menus control_bar border_around_the_chart".split(" "),
					enabledFeatures: []
				}
			},
			d = {
				BARS: 0,
				CANDLES: 1,
				LINE: 2,
				AREA: 3,
				HEIKEN_ASHI: 8,
				HOLLOW_CANDLES: 9,
				version: function() {
					return "1.10 dev (internal id 25b874df @ 2017-05-14 23:46:05.690158)"
				},
				gEl: function(a) {
					return document.getElementById(a)
				},
				gId: function() {
					return "tradingview_" + (1048576 * (1 + Math.random()) | 0).toString(16).substring(1)
				},
				onready: function(a) {
					window.addEventListener ? window.addEventListener("DOMContentLoaded", a, !1) : window.attachEvent("onload", a)
				},
				css: function(a) {
					var b = document.getElementsByTagName("head")[0],
						c = document.createElement("style");
					c.type = "text/css";
					c.styleSheet ? c.styleSheet.cssText = a : (a = document.createTextNode(a), c.appendChild(a));
					b.appendChild(c)
				},
				bindEvent: function(a, b, c) {
					a.addEventListener ? a.addEventListener(b, c, !1) : a.attachEvent && a.attachEvent("on" + b, c)
				},
				unbindEvent: function(a, b, c) {
					a.removeEventListener ? a.removeEventListener(b, c, !1) : a.detachEvent && a.detachEvent("on" + b, c)
				},
				widget: function(a) {
					this.id = d.gId();
					if(!a.datafeed) throw Error("Datafeed is not defined");
					var b = {
						width: 800,
						height: 500,
						symbol: "AA",
						interval: "D",
						timeframe: null,
						timezone: "",
						container: "",
						path: "",
						locale: "en",
						toolbar_bg: void 0,
						drawingsAccess: void 0,
						studiesAccess: void 0,
						widgetbar: {
							datawindow: !1,
							details: !1,
							watchlist: !1,
							watchlist_settings: {
								default_symbols: []
							}
						},
						overrides: {
							"mainSeriesProperties.showCountdown": !1
						},
						studiesOverrides: {},
						fullscreen: !1,
						autosize: !1,
						disabledFeatures: [],
						enabledFeatures: [],
						indicators_file_name: null,
						custom_css_url: null,
						auto_save_delay: null,
						debug: !1,
						time_frames: [{
								text: "5y",
								resolution: "W"
							}, {
								text: "1y",
								resolution: "W"
							}, {
								text: "6m",
								resolution: "120"
							},
							{
								text: "3m",
								resolution: "60"
							}, {
								text: "1m",
								resolution: "30"
							}, {
								text: "5d",
								resolution: "5"
							}, {
								text: "1d",
								resolution: "1"
							}
						],
						client_id: "0",
						user_id: "0",
						charts_storage_url: void 0,
						charts_storage_api_version: "1.0",
						logo: {},
						favorites: {
							intervals: [],
							chartTypes: []
						},
						rss_news_feed: null
					};
					this.options = g(!0, b, {
						width: a.width,
						height: a.height,
						symbol: a.symbol,
						interval: a.interval,
						timeframe: a.timeframe,
						timezone: a.timezone,
						container: a.container_id,
						path: a.library_path,
						locale: a.locale,
						toolbar_bg: a.toolbar_bg,
						drawingsAccess: a.drawings_access,
						studiesAccess: a.studies_access,
						widgetbar: a.widgetbar,
						overrides: a.overrides,
						studiesOverrides: a.studies_overrides,
						savedData: a.saved_data || a.savedData,
						snapshotUrl: a.snapshot_url,
						uid: this.id,
						datafeed: a.datafeed,
						customFormatters: a.customFormatters,
						tradingController: a.trading_controller,
						logo: a.logo,
						autosize: a.autosize,
						fullscreen: a.fullscreen,
						disabledFeatures: a.disabled_features,
						enabledFeatures: a.enabled_features,
						indicators_file_name: a.indicators_file_name,
						custom_css_url: a.custom_css_url,
						auto_save_delay: a.auto_save_delay,
						debug: a.debug,
						client_id: a.client_id,
						user_id: a.user_id,
						charts_storage_url: a.charts_storage_url,
						charts_storage_api_version: a.charts_storage_api_version,
						favorites: a.favorites,
						numeric_formatting: a.numeric_formatting,
						rss_news_feed: a.rss_news_feed,
						newsProvider: a.news_provider,
						studyCountLimit: a.study_count_limit,
						symbolSearchRequestDelay: a.symbol_search_request_delay,
						loadLastChart: a.load_last_chart
					});
					this.options.time_frames = a.time_frames || b.time_frames;
					a.preset && (a = a.preset, n[a] ? (a = n[a], this.options.disabledFeatures =
						0 < this.options.disabledFeatures.length ? this.options.disabledFeatures.concat(a.disabledFeatures) : a.disabledFeatures, this.options.enabledFeatures = 0 < this.options.enabledFeatures.length ? this.options.enabledFeatures.concat(a.enabledFeatures) : a.enabledFeatures) : console.warn("Unknown preset: `" + a + "`"));
					this._ready_handlers = [];
					this.create()
				}
			};
		d.widget.prototype = {
			_innerWindow: function() {
				return d.gEl(this.id).contentWindow
			},
			_autoResizeChart: function() {
				this.options.fullscreen && (d.gEl(this.id).style.height = window.innerHeight +
					"px")
			},
			create: function() {
				var a = this.render(),
					b = this,
					c;
				if(this.options.container) {
					var e = d.gEl(this.options.container);
					e.innerHTML = a
				} else document.write(a);
				if(this.options.autosize || this.options.fullscreen) e = d.gEl(this.id), e.style.width = "100%", this.options.fullscreen || (e.style.height = "100%");
				this._autoResizeChart();
				this._onWindowResize = function(a) {
					b._autoResizeChart()
				};
				window.addEventListener("resize", this._onWindowResize);
				c = d.gEl(this.id);
				var g = null,
					g = function() {
						d.unbindEvent(c, "load", g);
						c.contentWindow.widgetReady(function() {
							var a;
							b._ready = !0;
							for(a = b._ready_handlers.length; a--;) b._ready_handlers[a].call(b);
							c.contentWindow._initializationFinished()
						})
					};
				d.bindEvent(c, "load", g)
			},
			render: function() {
				window[this.options.uid] = {
					datafeed: this.options.datafeed,
					customFormatters: this.options.customFormatters,
					tradingController: this.options.tradingController,
					overrides: this.options.overrides,
					studiesOverrides: this.options.studiesOverrides,
					disabledFeatures: this.options.disabledFeatures,
					enabledFeatures: this.options.enabledFeatures,
					favorites: this.options.favorites,
					logo: this.options.logo,
					numeric_formatting: this.options.numeric_formatting,
					rss_news_feed: this.options.rss_news_feed,
					newsProvider: this.options.newsProvider,
					loadLastChart: this.options.loadLastChart
				};
				this.options.savedData && (window[this.options.uid].chartContent = {
					json: this.options.savedData
				});
				var a = (this.options.path || "") + "static/tv-chart.25b874dfaa22c43d2c05.html#localserver=1&symbol=" + encodeURIComponent(this.options.symbol) + "&interval=" + encodeURIComponent(this.options.interval) + (this.options.timeframe ?
						"&timeframe=" + encodeURIComponent(this.options.timeframe) : "") + (this.options.toolbar_bg ? "&toolbarbg=" + this.options.toolbar_bg.replace("#", "") : "") + (this.options.studiesAccess ? "&studiesAccess=" + encodeURIComponent(JSON.stringify(this.options.studiesAccess)) : "") + "&widgetbar=" + encodeURIComponent(JSON.stringify(this.options.widgetbar)) + (this.options.drawingsAccess ? "&drawingsAccess=" + encodeURIComponent(JSON.stringify(this.options.drawingsAccess)) : "") + "&timeFrames=" + encodeURIComponent(JSON.stringify(this.options.time_frames)) +
					"&locale=" + encodeURIComponent(this.options.locale) + "&uid=" + encodeURIComponent(this.options.uid) + "&clientId=" + encodeURIComponent(this.options.client_id) + "&userId=" + encodeURIComponent(this.options.user_id) + (this.options.charts_storage_url ? "&chartsStorageUrl=" + encodeURIComponent(this.options.charts_storage_url) : "") + (this.options.charts_storage_api_version ? "&chartsStorageVer=" + encodeURIComponent(this.options.charts_storage_api_version) : "") + (this.options.indicators_file_name ? "&indicatorsFile=" + encodeURIComponent(this.options.indicators_file_name) :
						"") + (this.options.custom_css_url ? "&customCSS=" + encodeURIComponent(this.options.custom_css_url) : "") + (this.options.auto_save_delay ? "&autoSaveDelay=" + encodeURIComponent(this.options.auto_save_delay) : "") + "&debug=" + this.options.debug + (this.options.snapshotUrl ? "&snapshotUrl=" + encodeURIComponent(this.options.snapshotUrl) : "") + (this.options.timezone ? "&timezone=" + encodeURIComponent(this.options.timezone) : "") + (this.options.studyCountLimit ? "&studyCountLimit=" + encodeURIComponent(this.options.studyCountLimit) :
						"") + (this.options.symbolSearchRequestDelay ? "&ssreqdelay=" + encodeURIComponent(this.options.symbolSearchRequestDelay) : "");
				return '<iframe id="' + this.id + '" name="' + this.id + '"  src="' + a + '"' + (this.options.autosize || this.options.fullscreen ? "" : ' width="' + this.options.width + '" height="' + this.options.height + '"') + ' frameborder="0" allowTransparency="true" scrolling="no" allowfullscreen style="display:block;"></iframe>'
			},
			onChartReady: function(a) {
				this._ready ? a.call(this) : this._ready_handlers.push(a)
			},
			setSymbol: function(a,
				b, c) {
				this._innerWindow().tradingViewApi.changeSymbol(a, b + "", c)
			},
			layout: function() {
				return this._innerWindow().tradingViewApi.layout()
			},
			setLayout: function(a) {
				return this._innerWindow().tradingViewApi.setLayout(a)
			},
			chartsCount: function() {
				return this._innerWindow().tradingViewApi.chartsCount()
			},
			chart: function(a) {
				return this._innerWindow().tradingViewApi.chart(a)
			},
			activeChart: function() {
				return this._innerWindow().tradingViewApi.activeChart()
			},
			watchList: function() {
				return this._innerWindow().tradingViewApi.watchlist()
			},
			createButton: function(a) {
				return this._innerWindow().createButton(a)
			},
			symbolInterval: function(a) {
				return this._innerWindow().tradingViewApi.getSymbolInterval(a)
			},
			remove: function() {
				window.removeEventListener("resize", this._onWindowResize);
				delete window[this.options.uid];
				var a = d.gEl(this.id);
				a.contentWindow.destroyChart();
				a.parentNode.removeChild(a)
			},
			getVisibleRange: function(a) {
				return this._innerWindow().tradingViewApi.getVisibleRange(a)
			},
			getVisiblePriceRange: function(a) {
				return this._innerWindow().tradingViewApi.getVisiblePriceRange(a)
			},
			subscribe: function(a, b) {
				this._innerWindow().tradingViewApi.subscribe(a, b)
			},
			onContextMenu: function(a) {
				this._innerWindow().tradingViewApi.onContextMenu(a)
			},
			onShortcut: function(a, b) {
				this._innerWindow().createShortcutAction(a, b)
			},
			onGrayedObjectClicked: function(a) {
				this._innerWindow().tradingViewApi.onGrayedObjectClicked(a)
			},
			closePopupsAndDialogs: function() {
				this._innerWindow().tradingViewApi.closePopupsAndDialogs()
			},
			applyOverrides: function(a) {
				this.options = g(!0, this.options, {
					overrides: a
				});
				this._innerWindow().applyOverrides(a)
			},
			applyStudiesOverrides: function(a) {
				this._innerWindow().applyStudiesOverrides(a)
			},
			createStudyTemplate: function(a, b) {
				return this._innerWindow().tradingViewApi.createStudyTemplate(a, b)
			},
			addCustomCSSFile: function(a) {
				this._innerWindow().addCustomCSSFile(a)
			},
			save: function(a) {
				this._innerWindow().tradingViewApi.saveChart(a)
			},
			load: function(a, b) {
				this._innerWindow().tradingViewApi.loadChart({
					json: a,
					extendedData: b
				})
			},
			setLanguage: function(a) {
				this.remove();
				this.options.locale = a;
				this.create()
			},
			isFloatingTradingPanelVisible: function() {
				return this._innerWindow().isFloatingTradingPanelVisible()
			},
			toggleFloatingTradingPanel: function() {
				this._innerWindow().toggleFloatingTradingPanel()
			},
			isBottomTradingPanelVisible: function() {
				return this._innerWindow().isBottomTradingPanelVisible()
			},
			toggleBottomTradingPanel: function() {
				this._innerWindow().toggleBottomTradingPanel()
			},
			showSampleOrderDialog: function(a) {
				return this._innerWindow().showSampleOrderDialog(a)
			},
			mainSeriesPriceFormatter: function() {
				return this._innerWindow().tradingViewApi.mainSeriesPriceFormatter()
			},
			showNoticeDialog: function(a) {
				this._innerWindow().tradingViewApi.showNoticeDialog(a)
			},
			showConfirmDialog: function(a) {
				this._innerWindow().tradingViewApi.showConfirmDialog(a)
			},
			selectLineTool: function(a) {
				this._innerWindow().tradingViewApi.selectLineTool(a)
			},
			selectedLineTool: function() {
				return this._innerWindow().tradingViewApi.selectedLineTool()
			},
			getSavedCharts: function(a) {
				this._innerWindow().tradingViewApi.getSavedCharts(a)
			},
			loadChartFromServer: function(a) {
				this._innerWindow().tradingViewApi.loadChartFromServer(a)
			},
			saveChartToServer: function(a, b, c, d) {
				this._innerWindow().tradingViewApi.saveChartToServer(a,
					b, c, d)
			},
			removeChartFromServer: function(a, b) {
				this._innerWindow().tradingViewApi.removeChartFromServer(a, b)
			},
			getIntervals: function() {
				return this._innerWindow().tradingViewApi.getIntervals()
			},
			getStudiesList: function() {
				return this._innerWindow().tradingViewApi.getStudiesList()
			}
		};
		m("onSymbolChange");
		m("onIntervalChange");
		[
			["onTick"],
			["onAutoSaveNeeded"],
			["onScreenshotReady"],
			["onBarMarkClicked", "onMarkClick"],
			["onTimescaleMarkClicked", "onTimescaleMarkClick"]
		].forEach(function(a) {
			d.widget.prototype[a[0]] =
				function(b) {
					var c = a[1] || a[0];
					console.warn("Method `" + a[0] + '` is obsolete. Please use `widget.subscribe("' + c + '", callback)` instead.');
					this.subscribe(c, b)
				}
		});
		window.TradingView && jQuery ? jQuery.extend(window.TradingView, d) : window.TradingView = d
	}
})();