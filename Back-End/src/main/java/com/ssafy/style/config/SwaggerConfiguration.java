package com.ssafy.style.config;

import com.google.common.base.Predicate;
import com.google.common.base.Predicates;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger.web.UiConfiguration;
import springfox.documentation.swagger.web.UiConfigurationBuilder;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

@Configuration
@EnableSwagger2
public class SwaggerConfiguration {

    ////////////////////////////////////////////컨트롤러 위치 연결/////////////////////////////////////////

    @Bean
    public Docket userApi() {
        return getDocket("회원", Predicates.or(PathSelectors.regex("/user.*")));
    }
    @Bean
    public Docket consultantApi() {
        return getDocket("컨설턴트", Predicates.or(PathSelectors.regex("/consultant.*")));
    }
    @Bean
    public Docket mailApi() {
        return getDocket("메일", Predicates.or(PathSelectors.regex("/mail.*")));
    }
    @Bean
    public Docket crawlingApi() {
        return getDocket("크롤링", Predicates.or(PathSelectors.regex("/crawling.*")));
    }
    @Bean
    public Docket openviduApi() {
        return getDocket("화상채팅", Predicates.or(PathSelectors.regex("/openvidu.*")));
    }
    @Bean
    public Docket reviewApi() {
        return getDocket("컨설턴트 리뷰", Predicates.or(PathSelectors.regex("/review.*")));
    }
    @Bean
    public Docket itemApi() {
        return getDocket("유저 장바구니", Predicates.or(PathSelectors.regex("/item.*")));
    }
    @Bean
    public Docket adminApi() {
        return getDocket("관리자 처리", Predicates.or(PathSelectors.regex("/admin.*")));
    }

    //////////////////////////////////////////////////////////////////////////////////////////////////////

    public Docket getDocket(String groupName, Predicate<String> predicate) {
        return new Docket(DocumentationType.SWAGGER_2)
                .groupName(groupName)
                .apiInfo(apiInfo())
                .select()
                .apis(RequestHandlerSelectors.basePackage("com.ssafy.style"))
                .paths(predicate)
                .apis(RequestHandlerSelectors.any())
                .build();
    }

    private ApiInfo apiInfo() {
        return new ApiInfoBuilder()
                .title("Style with us, Swagger")
                .description("Style with us 스웨거 입니다.")
                .version("0.0.1")
                .build();
    }

    @Bean
    public UiConfiguration uiConfig() {
        return UiConfigurationBuilder.builder().displayRequestDuration(true).validatorUrl("").build();
    }
}
