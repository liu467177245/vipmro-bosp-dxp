package net.vipmro.bosp.dxp.properties;

import net.vipmro.commons.JacksonHelper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

import java.util.HashMap;
import java.util.Map;

/**
 * UeConfig
 *
 * @author cmf00627
 * @date 2018/1/22
 */
@Configuration
@ConfigurationProperties("uedit-config")
public class UEditProperties {

    private static final String UP_FILE_NAME = "upfile";

    @Value("${image-action-name:uploadimage}")
    private String imageActionName;

    @Value("${image-max-size:2048000}")
    private Long imageMaxSize;

    @Value("${image-allow-fiels:.jpg,.jpeg,.gif,.bmp,.png}")
    private String[] imageAllowFiles;

    @Value("${image-compress-enable:true}")
    private Boolean imageCompressEnable;

    @Value("${image-compress-border:1600}")
    private Integer imageCompressBorder;

    @Value("${image-insert-align:none}")
    private String imageInsertAlign;

    private String imageUrlPrefix;

    public String getImageActionName() {
        return imageActionName;
    }

    public void setImageActionName(String imageActionName) {
        this.imageActionName = imageActionName;
    }

    public String getImageFieldName() {
        return UP_FILE_NAME;
    }

    public Long getImageMaxSize() {
        return imageMaxSize;
    }

    public void setImageMaxSize(Long imageMaxSize) {
        this.imageMaxSize = imageMaxSize;
    }

    public String[] getImageAllowFiles() {
        return imageAllowFiles;
    }

    public void setImageAllowFiles(String[] imageAllowFiles) {
        this.imageAllowFiles = imageAllowFiles;
    }

    public Boolean getImageCompressEnable() {
        return imageCompressEnable;
    }

    public void setImageCompressEnable(Boolean imageCompressEnable) {
        this.imageCompressEnable = imageCompressEnable;
    }

    public Integer getImageCompressBorder() {
        return imageCompressBorder;
    }

    public void setImageCompressBorder(Integer imageCompressBorder) {
        this.imageCompressBorder = imageCompressBorder;
    }

    public String getImageInsertAlign() {
        return imageInsertAlign;
    }

    public void setImageInsertAlign(String imageInsertAlign) {
        this.imageInsertAlign = imageInsertAlign;
    }

    public String getImageUrlPrefix() {
        return imageUrlPrefix;
    }

    public void setImageUrlPrefix(String imageUrlPrefix) {
        this.imageUrlPrefix = imageUrlPrefix;
    }

    public String toJsonString() {
        Map<String, Object> map = new HashMap<>();
        map.put("imageActionName", imageActionName);
        map.put("imageFieldName", UP_FILE_NAME);
        map.put("imageMaxSize", imageMaxSize);
        map.put("imageAllowFiles", imageAllowFiles);
        map.put("imageCompressEnable", imageCompressEnable);
        map.put("imageCompressBorder", imageCompressBorder);
        map.put("imageInsertAlign", imageInsertAlign);
        map.put("imageUrlPrefix", imageUrlPrefix);
        return JacksonHelper.toJsonString(map);
    }
}
