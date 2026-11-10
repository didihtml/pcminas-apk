import SwiftUI
import WebKit

@main
struct PUCMinasApp: App {
    var body: some Scene {
        WindowGroup {
            PortalView().ignoresSafeArea(edges: .bottom)
        }
    }
}

struct PortalView: UIViewRepresentable {
    func makeUIView(context: Context) -> WKWebView {
        let view = WKWebView(frame: .zero)
        view.isOpaque = false
        view.backgroundColor = UIColor(red: 13 / 255, green: 17 / 255, blue: 29 / 255, alpha: 1)
        view.load(URLRequest(url: URL(string: "https://puc-minas-main-nu.vercel.app/")!))
        return view
    }

    func updateUIView(_ view: WKWebView, context: Context) {}
}
