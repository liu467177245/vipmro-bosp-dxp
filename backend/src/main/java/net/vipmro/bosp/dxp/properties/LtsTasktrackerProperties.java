package net.vipmro.bosp.dxp.properties;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

/**
 * 任务调度配置信息 - LtsTasktrackerProperties
 *
 * @author cmf00627
 * @date 2018/2/2
 */
@Configuration
@ConfigurationProperties("lts.tasktracker")
public class LtsTasktrackerProperties {

    private String nodeGroup;

    private String jobName;

    private String urlPrefix;

    public String getNodeGroup() {
        return nodeGroup;
    }

    public void setNodeGroup(String nodeGroup) {
        this.nodeGroup = nodeGroup;
    }

    public String getJobName() {
        return jobName;
    }

    public void setJobName(String jobName) {
        this.jobName = jobName;
    }

    public String getUrlPrefix() {
        return urlPrefix;
    }

    public void setUrlPrefix(String urlPrefix) {
        this.urlPrefix = urlPrefix;
    }
}
