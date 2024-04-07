using System;
using System.Collections.Generic;
using System.Windows.Forms;
using System.Drawing;
using System.Net;

public class FormWindow : Form
{
    private Panel panel;
    private List<Label> labels = new List<Label>();
    private string[] fields = { "Title", "Description", "HD Image", "Image", "Date", "Media Type", "Service Version", "Copyright" };
    private string[] values;

    public FormWindow(string[] values)
    {
        // Set up the form
        Text = values[0];
        Size = new System.Drawing.Size(800, 850);

        // Save the values
        this.values = values;

        // Create panel for scrolling
        panel = new Panel();
        panel.Dock = DockStyle.Fill;
        panel.AutoScroll = true;
        Controls.Add(panel);

        // Create and configure labels dynamically
        int y = 20;
        for (int i = 0; i < fields.Length; i++)
        {
            Label label = new Label();
            label.AutoSize = true;
            label.Text = fields[i] + ": " + values[i];
            label.Location = new System.Drawing.Point(50, y);
            panel.Controls.Add(label);
            labels.Add(label);

            if (fields[i] == "Description")
            {
                label.MaximumSize = new System.Drawing.Size(700, 0);
            }

            y += label.Height + 10;
        }

        RenderImage();
    }

    private void RenderImage()
    {
        try
        {
            PictureBox pictureBox = new PictureBox();
            pictureBox.SizeMode = PictureBoxSizeMode.AutoSize; // Adjust size mode to control how the image is displayed

            // Download the image
            Image downloadedImage = DownloadImage("https://apod.nasa.gov/apod/image/2403/NGC5139_mdf1024.png");

            // Calculate the scaled width based on the maximum width you desire
            int maxWidth = 500; // Set your desired maximum width here
            int scaledWidth = Math.Min(maxWidth, downloadedImage.Width);

            // Scale the image while preserving aspect ratio
            int scaledHeight = (int)(((double)scaledWidth / downloadedImage.Width) * downloadedImage.Height);
            Image scaledImage = new Bitmap(downloadedImage, scaledWidth, scaledHeight);

            // Assign the scaled image to the PictureBox
            pictureBox.Image = scaledImage;
            pictureBox.Location = new System.Drawing.Point(50, 275);

            // Controls.Add(pictureBox);
            panel.Controls.Add(pictureBox);
        }
        catch (Exception ex)
        {
            MessageBox.Show("An error occurred: " + ex.Message);
        }
    }

    private Image DownloadImage(string url)
    {
        ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls12;

        using (WebClient webClient = new WebClient())
        {
            byte[] data = webClient.DownloadData(url);
            using (var stream = new System.IO.MemoryStream(data))
            {
                return Image.FromStream(stream);
            }
        }
    }

    [STAThread]
    public static void Main()
    {
        // Data from the provided object
        string title = "Millions of Stars in Omega Centauri";
        string description = "Globular star cluster Omega Centauri, also known as NGC 5139, is 15,000 light-years away. The cluster is packed with about 10 million stars much older than the Sun within a volume about 150 light-years in diameter. It's the largest and brightest of 200 or so known globular clusters that roam the halo of our Milky Way galaxy. Though most star clusters consist of stars with the same age and composition, the enigmatic Omega Cen exhibits the presence of different stellar populations with a spread of ages and chemical abundances. In fact, Omega Cen may be the remnant core of a small galaxy merging with the Milky Way. With a yellowish hue, Omega Centauri's red giant stars are easy to pick out in this sharp, color telescopic view.";
        string hdImage = "https://apod.nasa.gov/apod/image/2403/NGC5139_mdf.png";
        string url = "https://apod.nasa.gov/apod/image/2403/NGC5139_mdf1024.png";
        string date = "2024-03-28";
        string mediaType = "image";
        string serviceVersion = "v1";
        string copyright = "Massimo Di Fusco";

        // Values array for form initialization
        string[] values = { title, description, hdImage, url, date, mediaType, serviceVersion, copyright };

        // Run the application
        Application.EnableVisualStyles();
        Application.SetCompatibleTextRenderingDefault(false);
        Application.Run(new FormWindow(values));
    }
}
