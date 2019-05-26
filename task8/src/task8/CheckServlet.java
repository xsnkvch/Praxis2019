package task8;

import org.json;
import org.json.JSONWriter;
import org.json.simple.JSONObject;

import javax.servlet.ServletException;
import javax.servlet.ServletOutputStream;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebServlet(name = "CheckServlet", urlPatterns = "/check")
public class CheckServlet extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        ServletOutputStream stream = response.getOutputStream();
        JSONObject json = new JSONObject();
        json.put("sucesss", "true");
        stream.println(json.toString());
    }
}
