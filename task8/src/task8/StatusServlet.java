package task8;

import java.io.IOException;

public class StatusServlet extends javax.servlet.http.HttpServlet {
    protected void doGet(javax.servlet.http.HttpServletRequest request, javax.servlet.http.HttpServletResponse response) throws javax.servlet.ServletException, IOException {
        response.getOutputStream().print("<html><a style='color:red'>Application Is Running</a></html>");
    }
}
