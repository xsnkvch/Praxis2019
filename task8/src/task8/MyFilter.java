package task8;

import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;

public class MyFilter implements Filter {

    @Override
    public void init(FilterConfig config) throws ServletException { }

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws ServletException, IOException {
        long start = System.currentTimeMillis();
        chain.doFilter(request, response);
        long end = System.currentTimeMillis();

        HttpServletRequest req = (HttpServletRequest) request;
        String url = new String(req.getRequestURL());
        String query = req.getQueryString();
        String method = req.getMethod();
        if (query != null) {
            System.out.println(method + " - " + url + "?" + query + " - " + (end - start));
        }
        else {
            System.out.println(method + " - " + url + " - " + (end - start));
        }
    }

    @Override
    public void destroy() { }
}
