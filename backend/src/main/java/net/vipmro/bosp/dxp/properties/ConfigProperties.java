package net.vipmro.bosp.dxp.properties;

import net.vipmro.athena.common.properties.OAuthProperties;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Configuration
@ConfigurationProperties(prefix = "config")
public class ConfigProperties {
    private OAuthProperties oauth;

    public OAuthProperties getOauth() {
        return oauth;
    }

    public void setOauth(OAuthProperties oauth) {
        this.oauth = oauth;
    }

    public String getAppKey(){
        return  oauth.getAppKey();
    }
}
