package com.appsmith.server.dtos;

import com.appsmith.server.domains.User;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
public class UserPageList {
    Integer page ;
    Integer size;
    Long total;
    List<User> users;
    public  UserPageList(Integer page,Integer  size,Long total,List<User> users)
    {
        this.page = page;
        this.size = size;
        this.total = total;
        this.users = users;
    }
}
