package com.pristine.crux;

import com.chimbori.crux.articles.Article;
import com.chimbori.crux.articles.ArticleExtractor;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactMethod;

import java.util.List;
import java.util.Map;

import okhttp3.Response;

public class CruxModule extends ReactContextBaseJavaModule {
  public CruxModule(ReactApplicationContext reactContext) {
    super(reactContext);
  }

  @Override
  public String getName() {
    return "Crux";
  }

  @ReactMethod
    public void misread(String url, String rawHTML, Callback returnArticle) {
        Article article = ArticleExtractor.with(url, rawHTML)
                .extractMetadata()
                .extractContent()
                .article();


        returnArticle.invoke(article.document.toString());
    }
}


