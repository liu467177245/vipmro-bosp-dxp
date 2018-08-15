package net.vipmro.bosp.dxp.feign;

import net.vipmro.athena.common.dto.Result;
import net.vipmro.athena.scheduler.common.JobVo;
import net.vipmro.athena.scheduler.vo.JobDetailVo;
import org.springframework.cloud.netflix.feign.FeignClient;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

/**
 * @author wangmt
 * @date 2017/12/13
 */
@FeignClient("${service.athena.scheduler-service:vipmro-athena-scheduler-service}")
public interface SchedulerServiceFeignClient {

    @RequestMapping(value = "/createjob", method = RequestMethod.POST)
    Result<JobVo> createJob(@RequestBody JobVo job);

    /**
     * 获取jobs
     * @param appId 应用id
     * @param userId 用户id
     * @return Result<List<JobDetailVo>>z
     */
    @RequestMapping(value = "/getjobs", method = RequestMethod.GET)
    Result<List<JobDetailVo>> getJobs(@RequestParam("appId") String appId, @RequestParam("userId") String userId);
}
