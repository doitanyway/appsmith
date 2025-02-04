package com.appsmith.server.repositories.ce;

import com.appsmith.server.acl.AclPermission;
import com.appsmith.server.domains.User;
import com.appsmith.server.repositories.AppsmithRepository;
import org.springframework.data.mongodb.core.query.UpdateDefinition;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.Set;

public interface CustomUserRepositoryCE extends AppsmithRepository<User> {

    Mono<User> findByEmail(String email, AclPermission aclPermission);

    Mono<User> findByEmailAndTenantId(String email, String tenantId);

    Mono<Boolean> isUsersEmpty();

    Set<String> getSystemGeneratedUserEmails();

    Mono<Integer> updateById(String id, UpdateDefinition updateObj);

    /**
     * 分页查询用户列表
     * @param page 页码(从0开始)
     * @param size 每页大小
     * @param email 可选的邮箱搜索条件
     * @return 用户列表
     */
    Flux<User> findAllByPagination(int page, int size, String email);

    /**
     * 获取符合条件的用户总数
     * @param email 可选的邮箱搜索条件
     * @return 用户总数
     */
    Mono<Long> countUsers(String email);

    Mono<User> deleteUser(String userId);

}
